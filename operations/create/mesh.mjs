import Tensor from '../../tensor/index.mjs'
import Source from '../../template/source.mjs'
import __Math__ from '../arithmetic/index.mjs'

export default class Mesh {
    constructor(args) {
        /** Properties */
        this.of = args.of
        this.axes = [...this.of.keys()]
        this.shapes = this.of.map(function (dimension) { return dimension.length })

        /** Result */
        this.result = args.result || this.resultant()

        /** Initialize */
        this.symbolicSourceTemplate()

        /** Create */
        this.invoke = new Function(
            'A = this.of',
            'B = this.with',
            'R = this.result',
            [this.source, 'return R'].join('\n'))
    }

    /** Symbolic Implementation */
    symbolicSourceTemplate() {
        this.source = new Source([
            `let i = 0`,
            new Source().nestedFor(this.axes, this.shapes, [
                this.of.map(function (_, i) {
                    return `R.data[i++] = A[${i}][i${i}]`
                })
            ])
        ])
    }

    size(all, dimension) {
        return all * dimension.length
    }

    resultant() {
        return Tensor.zeros([
            this.of.reduce(this.size, 1),
            this.of.length
        ])
    }

    /** (TODO) Pointwise Implementation */
}

