import Tensor from '../../tensor/index.mjs'
import Algebra from '../../template/algebra.mjs'
import LinearAlgebraOperation from './operation.mjs'

export default class MatrixMultiplication extends LinearAlgebraOperation {
    constructor(args) {
        /** Superclass */
        super(args)

        /** Result */
        this.result = args.result || this.resultant()

        /** Initialize */
        if (this.like < 40) {
            this.pointwiseSourceBoilerplate() // super class method
            this.pointwiseSourceTemplate() // super class method, utilizes helpers below
        }

        if (this.like > 40) {
            this.symbolicSourceBoilerplate()
            this.symbolicSourceTemplate()
        }

        /** Create */
        this.invoke = new Function(
            'A = this.of',
            'B = this.with',
            'R = this.result',
            [this.source, 'return R'].join('\n'))
    }

    /** Resultant Tensor */
    resultant() {
        return Tensor.zeros([
            this.of.header.shape[0],
            this.with.header.shape[1]], this.of.header.type)
    }

    /** Pointwise Implementation */
    start() { this.source = [] }

    inLoop() {
        const R = Algebra.variable({ symbol: 'R.data', size: this.result.header.type.size, index: this.result.header.literalIndex([this.r, this.c]) })

        const dot = new Array(this.like).fill(null).map(function (_, s) {
            const A = Algebra.variable({ symbol: 'A.data', size: this.of.header.type.size, index: this.of.header.literalIndex([this.r, s]) })
            const B = Algebra.variable({ symbol: 'B.data', size: this.with.header.type.size, index: this.with.header.literalIndex([s, this.c]) })

            return Algebra.multiply(A, B)
        }, this).reduce(Algebra.add)

        this.source.push(Algebra.assign(R, dot))
    }

    finish() { this.source = this.source.join('\n') }

    /** Symbolic Implementation */
    symbolicSourceBoilerplate() {
        this.variables = {}
        this.variables.of = Algebra.variable({ symbol: 'A.data', size: this.of.header.type.size, index: 'AIndex' })
        this.variables.with = Algebra.variable({ symbol: 'B.data', size: this.with.header.type.size, index: 'BIndex' })
        this.variables.result = Algebra.variable({ symbol: 'R.data', size: this.result.header.type.size, index: 'RIndex' })

        this.indices = {}
        this.indices.of = `const AIndex = r * A.header.strides[0] + s * A.header.strides[1] + A.header.offset`
        this.indices.with = `const BIndex = r * B.header.strides[0] + s * B.header.strides[1] + B.header.offset`
        this.indices.result = `const RIndex = r * R.header.strides[0] + c * R.header.strides[1] + R.header.offset`
    }

    symbolicSourceTemplate() {
        this.source = [
            `for (let r = 0; r < A.header.shape[0]; r++){`,
            `for (let c = 0; c < B.header.shape[1]; c++){`,

            this.indices.result,
            `R.data[RIndex] = 0`,

            `for (let s = 0; s < A.header.shape[1]; s++) {`,

            this.indices.of,
            this.indices.with,

            Algebra.assign(this.variables.result,
                Algebra.multiply(this.variables.of, this.variables.with), '+='),
            `}}}`,
        ].join('\n')
    }
}
