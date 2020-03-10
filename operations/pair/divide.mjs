import Algebra from '../../template/algebra.mjs'
import PairOperation from './interface.mjs'

export default class Division extends PairOperation {
    constructor(args) { super(args) }

    inLoop() {
        return Algebra.divide(
            this.variables.result, 
            this.variables.of, 
            this.variables.with)
    }
}
