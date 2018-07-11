import * as rawArrayUtils from '../utils/array/raw'
import * as ndimArrayUtils from '../utils/array/ndim'

export default class MultiDimArray {

    constructor() { }

    _c1(A, type = Float64Array) {
        this.data = type(rawArrayUtils.flatten(A))

        this.header = {}
        this.header.shape = rawArrayUtils.getShape(this.data)
        this.header.stride = ndimArrayUtils.getStride(this.header.shape)
        this.header.offset = 0
    }

    _c2(data, header) {
        this.data = data
        this.header = header
    }

    static array(A, type = Float64Array) {
        return new MultiDimArray()._c1(A, type)
    }


    slice(...index) {
        const newHeader = ndimArrayUtils.getSlice(index, this.header)
        return new MultiDimArray()._c2(this.data, newHeader)
    }

    inspect() { return this.toString() }
    toString() {

    }
}