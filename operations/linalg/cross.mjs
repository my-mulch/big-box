import Tensor from '../../tensor/index.mjs'
import Algebra from '../../template/algebra.mjs'
import LinearAlgebraOperation from './operation.mjs'

export default class CrossProduct extends LinearAlgebraOperation {
    constructor(args) {
        /** Superclass */
        super(args)

        /** Result */
        this.result = args.result || this.resultant()

        /** Initialize */
        this.pointwiseSourceBoilerplate() // super class method
        this.pointwiseSourceTemplate()

        /** Create */
        this.invoke = new Function(
            'A = this.of',
            'B = this.with',
            'R = this.result',
            [this.source, 'return R'].join('\n'))
    }

    /** Resultant Tensor */
    resultant() { return Tensor.zeros([3, 1], this.of.header.type) }

    /** Pointwise Implementation */
    pointwiseSourceTemplate() {
        const A = [], B = [], R = []

        for (let i = 0; i < 3; i++) {
            A.push(Algebra.variable({ symbol: 'A.data', index: this.of.header.literalIndex([i, 0]), size: this.of.header.type.size }))
            B.push(Algebra.variable({ symbol: 'B.data', index: this.with.header.literalIndex([i, 0]), size: this.with.header.type.size }))
            R.push(Algebra.variable({ symbol: 'R.data', index: this.result.header.literalIndex([i, 0]), size: this.result.header.type.size }))
        }

        this.source = [
            Algebra.assign(R[0], Algebra.add(Algebra.negate(Algebra.multiply(A[2], B[1])), Algebra.multiply(B[2], A[1]))),
            Algebra.assign(R[1], Algebra.add(Algebra.negate(Algebra.multiply(A[0], B[2])), Algebra.multiply(B[0], A[2]))),
            Algebra.assign(R[2], Algebra.subtract(Algebra.multiply(A[0], B[1]), Algebra.multiply(B[0], A[1]))),
        ].join('\n')
    }
}
