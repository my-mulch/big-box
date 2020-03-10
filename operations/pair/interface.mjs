import Tensor from '../../tensor/index.mjs'
import Source from '../../template/source.mjs'
import __Math__ from '../arithmetic/index.mjs'
import TensorOperation from '../interface.mjs'

export default class PairOperation extends TensorOperation {
    constructor(args) {
        /** Superclass */
        super(args)

        /** Result */
        this.result = args.result || this.resultant()

        /** Axes */
        this.axes = {}
        this.axes.total = [...new Array(__Math__.max(this.of.header.shape.length, this.with.header.shape.length)).keys()]

        /** Shapes */
        this.shapes = {}

        /** Sizes */
        this.sizes = {}

        /** Initialize */
        this.symbolicSourceBoilerplate()
        this.symbolicSourceTemplate()

        /** Create */
        this.invoke = new Function(
            'A = this.of',
            'B = this.with',
            'R = this.result',
            [this.source, 'return R'].join('\n'))
    }

    resultant() {
        const shape = []
        const maxLen = __Math__.max(this.of.header.shape.length, this.with.header.shape.length)

        for (let i = 0; i < maxLen; i++) {
            const bi = this.with.header.shape.length - 1 - i
            const ai = this.of.header.shape.length - 1 - i

            if (this.with.header.shape[bi] === 1 || this.with.header.shape[bi] === undefined)
                shape.push(this.of.header.shape[ai])

            else if (this.of.header.shape[ai] === 1 || this.of.header.shape[ai] === undefined)
                shape.push(this.with.header.shape[bi])

            else if (this.with.header.shape[bi] === this.of.header.shape[ai])
                shape.push(this.of.header.shape[ai])
        }

        return Tensor.zeros(shape.reverse(), this.of.header.type)
    }

    symbolicSourceBoilerplate() {
        /** Shapes */
        this.shapes.total = this.shapes.total || this.axes.total.map(this.shape.bind(this.result))

        /** Sizes */
        this.sizes.total = this.sizes.total || this.axes.total.reduce(this.size.bind(this.result), 1)

        /** Axes */
        this.axes.of = this.of.header.nonZeroAxes(this.axes.total)
        this.axes.with = this.with.header.nonZeroAxes(this.axes.total)
        this.axes.result = this.result.header.nonZeroAxes(this.axes.total)

        super.symbolicSourceBoilerplate()
    }

    symbolicSourceTemplate() {
        this.source = new Source([
            this.start &&
            this.start(),

            new Source()
                .nestedFor(
                    this.axes.total,
                    this.shapes.total,
                    [
                        Object.values(this.indices).join('\n'),

                        this.inLoop &&
                        this.inLoop(),
                    ]),

            this.finish &&
            this.finish()
        ])
    }
}

