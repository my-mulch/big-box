import Algebra from '../../template/algebra.mjs'
import PairOperation from './interface.mjs'

export default class Assignment extends PairOperation {
    constructor(args) {
        super({
            ...args,
            of: args.of.slice(args.region || []),
            result: args.of
        })
    }

    symbolicSourceBoilerplate() {
        this.shapes.total = this.axes.total.map(this.shape.bind(this.of))
        this.sizes.total = this.axes.total.reduce(this.size.bind(this.of), 1)

        super.symbolicSourceBoilerplate()
    }

    inLoop() {
        return Algebra.assign(this.variables.of, this.variables.with).join('\n')
    }
}
