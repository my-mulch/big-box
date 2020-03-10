import Norm from './norm.mjs'
import Tensor from '../../tensor/index.mjs'
import Source from '../../template/source.mjs'
import Algebra from '../../template/algebra.mjs'
import AxisOperation from './interface.mjs'

export default class Unit extends AxisOperation {
    constructor(args) {
        super({
            axes: args.axes || AxisOperation.NONE,
            norm: new Norm(args),
            ...args
        })
    }

    resultant() { return Tensor.zerosLike(this.of) }

    start() { return 'this.norm.invoke()' }

    inLoop() {
        return new Source([
            this.indices.of,
            this.indices.result,

            Algebra.divide(
                this.variables.result,
                this.variables.of,
                ['this.norm.result.data[0]'])
        ])
    }
}
