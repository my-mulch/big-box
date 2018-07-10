import Header from './header'
import * as rawArrayUtils from '../utils/array/raw'
import * as ndimArrayUtils from '../utils/array/ndim'

export default class MultiDimArray {

    constructor(A, type = Float64Array) {
        this.header = new Header(A)
        this.data = type(rawArrayUtils.flatten(A))
    }

    static array(A, type = Float64Array) {
        return new MultiDimArray(A, type)
    }

    slice(...index) {
        
    }

    toString() { }
    inspect() { }
}
