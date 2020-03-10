import Algebra from '../../template/algebra.mjs'
import PairOperation from './interface.mjs'

export default class Addition extends PairOperation {
    constructor(args) { super(args) }

    inLoop() {
        return Algebra.assign(this.variables.result,
            Algebra.add(this.variables.of, this.variables.with)).join('\n')
    }
}
