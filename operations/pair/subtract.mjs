import Algebra from '../../template/algebra.mjs'
import PairOperation from './interface.mjs'

export default class Subtraction extends PairOperation {
    constructor(args) { super(args) }

    inLoop() {
        return Algebra.assign(this.variables.result,
            Algebra.subtract(this.variables.of, this.variables.with)).join('\n')
    }
}
