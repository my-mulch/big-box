import Algebra from '../../template/algebra.mjs'
import Determinant from './determinant.mjs'
import LinearAlgebraOperation from './operation.mjs'
import { indexTemplate } from './utils.mjs'

export default class Adjugate extends LinearAlgebraOperation {
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
        this.source = []
    }

    inLoop() {
        const sign = Math.pow(-1, (this.r + this.c) % 2)
        const subMatrix = Determinant.subMatrix(indexTemplate(this.size), this.c, this.r)
        const determinant = Determinant.determinant(this.of, subMatrix)
        const cofactor = sign < 0 ? Algebra.negate(determinant) : determinant

        this.source.push(Algebra.assign(Algebra.variable({
            index: this.result.header.literalIndex([this.r, this.c]),
            symbol: 'R.data',
            size: this.result.header.type.size
        }), cofactor))
    }

    finish() { this.source = this.source.join('\n') }

    determinant() {
        const source = [`const D = new Array(${this.of.header.type.size})`]

        const variable = Algebra.variable({ symbol: 'D', size: this.of.header.type.size, index: 0 })

        const value = new Array(this.size).fill(null).map(function (_, i) {
            return Algebra.multiply(
                Algebra.variable({ symbol: 'A.data', size: this.of.header.type.size, index: this.of.header.literalIndex([0, i]) }),
                Algebra.variable({ symbol: 'R.data', size: this.of.header.type.size, index: this.result.header.literalIndex([i, 0]) }))
        }, this).reduce(Algebra.add)

        source.push(Algebra.assign(variable, value))

        return source.join('\n')
    }

    /** (TODO) Symbolic Implementation */
}
