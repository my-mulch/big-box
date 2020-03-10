import Tensor from '../../tensor/index.mjs'
import Source from '../../template/source.mjs'
import __Math__ from '../arithmetic/index.mjs'
import TensorOperation from '../interface.mjs'

export default class AxisOperation extends TensorOperation {
    static ALL = 'all'
    static NONE = 'none'
    static LAST = 'last'

    constructor(args) {
        super(args)

        /** Norm */
        this.norm = args.norm

        /** Count */
        this.count = args.count

        /** Entries */
        this.entries = args.entries

        /** Axes */
        this.axes = {}

        switch (args.axes) {
            case AxisOperation.NONE: this.axes.inner = []; break
            case AxisOperation.ALL: this.axes.inner = [...this.of.header.shape.keys()]; break
            case AxisOperation.LAST: this.axes.inner = [this.of.header.shape.length - 1]; break
            default: this.axes.inner = args.axes; break
        }

        this.axes.total = [...this.of.header.shape.keys()]
        this.axes.outer = __Math__.difference(this.axes.total, this.axes.inner)
        this.axes.order = this.axes.outer.concat(this.axes.inner)
        this.axes.last = this.axes.order[this.axes.order.length - 1]

        /** Shapes */
        this.shapes = {}
        this.shapes.outer = this.axes.outer.map(this.shape.bind(this.of))
        this.shapes.inner = this.axes.inner.map(this.shape.bind(this.of))

        /** Sizes */
        this.sizes = {}
        this.sizes.outer = this.axes.outer.reduce(this.size.bind(this.of), 1)
        this.sizes.inner = this.axes.inner.reduce(this.size.bind(this.of), 1)

        /** Result */
        this.result = args.result || this.resultant()

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

    unselectedAxes(_, axis) {
        return !this.axes.inner.includes(axis)
    }

    resultant() {
        return Tensor.zeros(
            this.of.header.shape.filter(this.unselectedAxes, this),
            this.of.header.type,
        )
    }

    symbolicSourceBoilerplate() {
        /** Axes */
        this.axes.of = this.axes.of || this.of.header.nonZeroAxes(this.axes.total)
        this.axes.with = this.axes.with || this.with.header.nonZeroAxes(this.axes.inner)
        this.axes.result = this.axes.result || this.result.header.nonZeroAxes(this.axes.outer)

        super.symbolicSourceBoilerplate()
    }

    symbolicSourceTemplate() {
        this.source = new Source([
            this.start &&
            this.start(),

            new Source().nestedFor(
                this.axes.outer,
                this.shapes.outer,
                [
                    this.preLoop &&
                    this.preLoop(),

                    new Source().nestedFor(
                        this.axes.inner,
                        this.shapes.inner,
                        [
                            this.inLoop &&
                            this.inLoop(),
                        ]),

                    this.postLoop &&
                    this.postLoop(),
                ]),

            this.finish &&
            this.finish(),
        ])
    }
}

