import Source from '../../template/source.mjs'
import Algebra from '../../template/algebra.mjs'
import Tensor from '../../tensor/index.mjs'
import __Math__ from '../arithmetic/index.mjs'
import AxisOperation from './interface.mjs'

export default class Insert extends AxisOperation {
    constructor(args) {
        super({
            axes: args.axes || AxisOperation.LAST,
            entries: args.entries.sort(__Math__.subtract).map(Number),
            ...args,
        })
    }

    resultant() {
        const shape = this.of.header.shape.slice()
        shape[this.axes.inner[0]] += this.entries.length

        return Tensor.zeros(shape, this.of.header.type)
    }

    symbolicSourceBoilerplate() {
        this.axes.of = this.of.header.nonZeroAxes(this.axes.total)

        if (!this.axes.of[this.axes.last])
            this.axes.of[this.axes.last] = [`i${this.axes.last}`, this.of.header.strides[this.axes.last]]

        this.axes.of[this.axes.last][0] = `(i${this.axes.last} - seen)`
        this.axes.with = this.with.header.nonZeroAxes(this.axes.total)
        this.axes.result = this.result.header.nonZeroAxes(this.axes.total)

        /** Shapes */
        this.shapes = {}
        this.shapes.outer = this.axes.outer.map(super.shape.bind(this.result))
        this.shapes.inner = this.axes.inner.map(super.shape.bind(this.result))

        super.symbolicSourceBoilerplate()
    }

    start() { return new Source(['let seen = 0']) }
    preLoop() { return new Source(['seen = 0']) }

    inLoop() {
        return new Source([
            /** Indices */
            new Source(Object.values(this.indices)),

            /** Insertion Check */
            new Source([`const insert = (this.entries[seen] + seen) === i${this.axes.inner[0]}`]),

            /** Insertion */
            new Source()
                .if('insert')
                .then(['seen++', ...Algebra.assign(this.variables.result, this.variables.with)])
                .else([...Algebra.assign(this.variables.result, this.variables.of)])
        ])
    }
}
