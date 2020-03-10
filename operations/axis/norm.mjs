import Source from '../../template/source.mjs'
import Tensor from '../../tensor/index.mjs'
import Algebra from '../../template/algebra.mjs'
import AxisOperation from './interface.mjs'

export default class Norm extends AxisOperation {
    constructor(args) { super({ axes: args.axes || AxisOperation.ALL, ...args }) }

    resultant() {
        return Tensor.zeros(
            this.of.header.shape.filter(this.unselectedAxes, this),
            Tensor.Float32,
        )
    }

    start() {
        return new Source([`const temp = new Array(${this.of.header.type.size})`])
    }

    preLoop() {
        return new Source([this.indices.result, `temp.fill(0)`])
    }

    inLoop() {
        return new Source([
            this.indices.of,
            Algebra.assign(
                this.variables.temp.slice(0, 1),
                Algebra.sum(Algebra.square(this.variables.of)), '+=').slice(0, 1)
        ])
    }

    postLoop() {
        return Algebra.assign(this.variables.result, Algebra.squareRoot(this.variables.temp))
    }
}
