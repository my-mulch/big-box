import Source from '../../template/source.mjs'
import Algebra from '../../template/algebra.mjs'
import AxisOperation from './interface.mjs'

export default class Mean extends AxisOperation {
    constructor(args) { super({ axes: args.axes || AxisOperation.ALL, ...args }) }

    start() {
        return new Source([`const temp = new Array(${this.of.header.type.size})`])
    }

    preLoop() {
        return new Source([
            this.indices.result,
            `temp.fill(0)`
        ])
    }

    inLoop() {
        return new Source([
            this.indices.of,
            Algebra.assign(this.variables.temp, this.variables.of, '+=')
        ])
    }

    postLoop() {
        return Algebra.assign(this.variables.result,
            Algebra.scale(this.variables.temp, 1 / this.sizes.inner))
    }
}
