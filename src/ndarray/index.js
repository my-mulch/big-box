import Header from './header'
import * as rawArrayUtils from '../utils/array/raw'
import * as ndimArrayUtils from '../utils/array/ndim'

export default class MultiDimArray {

    constructor(A, type = Float64Array) {
        this.data = type(rawArrayUtils.flatten(A))

        this.header = {}
        this.header.shape = rawArrayUtils.getShape(this.data)
        this.header.stride = rawArrayUtils.getStride(this.header.shape)
        this.header.offset = 0
    }

    static array(A, type = Float64Array) {
        return new MultiDimArray(A, type)
    }


    slice(...index) {
        ndimArrayUtils.getSlice(index, this.header)
    }

    toString() { }
    inspect() { }
}
