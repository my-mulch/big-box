import Algebra from '../../template/algebra.mjs'
import Adjugate from './adjugate.mjs'
import LinearAlgebraOperation from './operation.mjs'

export default class Inverse extends LinearAlgebraOperation {
    constructor(args) {
        /** Superclass */
        super(args)

        /** Result */
        this.result = args.result || this.resultant()

        /** Initialize */
        super.pointwiseSourceBoilerplate()
        super.pointwiseSourceTemplate()

        /** Create */
        this.invoke = new Function(
            'A = this.of',
            'B = this.with',
            'R = this.result',
            [this.source, 'return R'].join('\n'))
    }

    /** Pointwise Implementation */
    start() {
        this.adjugate = new Adjugate({ of: this.of })

        this.source = [
            `const T = new Array(${this.of.header.type.size})`,
            this.adjugate.source,
            this.adjugate.determinant(),
        ]
    }

    inLoop() {
        const T = Algebra.variable({ symbol: 'T', size: this.of.header.type.size, index: 0 })
        const D = Algebra.variable({ symbol: 'D', size: this.of.header.type.size, index: 0 })
        const R = Algebra.variable({ symbol: 'R.data', index: this.result.header.literalIndex([this.r, this.c]), size: this.result.header.type.size })

        this.source.push(Algebra.divide(T, R, D))
        this.source.push(Algebra.assign(R, T))
    }

    finish() {
        this.source = this.source.flat(Number.POSITIVE_INFINITY).join('\n')
    }

    /** (TODO) Symbolic Implementation */
}
