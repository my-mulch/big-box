import Tensor from '../../tensor/index.mjs'
import Source from '../../template/source.mjs'
import Algebra from '../../template/algebra.mjs'
import AxisOperation from './interface.mjs'

export default class Repeat extends AxisOperation {
    constructor(args) {
        super({
            axes: args.axes || AxisOperation.LAST,
            count: args.count || 1,
            ...args,
        })
    }

    resultant() {
        const shape = this.of.header.shape.slice()
        shape[this.axes.inner[0]] *= this.count

        return Tensor.zeros(shape, this.of.header.type)
    }

    symbolicSourceBoilerplate() {
        /** Axes */
        this.axes.of = this.of.header.nonZeroAxes(this.axes.total)
        this.axes.with = this.with.header.nonZeroAxes(this.axes.total)
        this.axes.result = this.result.header.nonZeroAxes(this.axes.total)
        this.axes.result[this.axes.last][0] = 'r'

        super.symbolicSourceBoilerplate()
    }

    inLoop() {
        return new Source([
            this.indices.of,

            new Source()
                .for(`let r = i${this.axes.last}*${this.count}, c = 0`, `c < ${this.count}`, 'r++, c++')
                .then([
                    this.indices.result,
                    Algebra.assign(this.variables.result, this.variables.of)
                ])
        ])
    }
}
