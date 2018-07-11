import * as rawArrayUtils from '../utils/array/raw/index.mjs'
import * as ndimArrayUtils from '../utils/array/ndim/index.mjs'

export default class MultiDimArray {

    constructor() {}

    _c1(A, type = Float64Array) {
        this.data = new type(rawArrayUtils.flatten(A))

        this.header = {}
        this.header.shape = rawArrayUtils.getShape(A)
        this.header.stride = ndimArrayUtils.getStride(this.header.shape)
        this.header.offset = 0

        return this
    }

    _c2(data, header) {
        this.data = data
        this.header = header

        return this
    }

    static array(A, type = Float64Array) {
        return new MultiDimArray()._c1(A, type)
    }


    slice(...index) {
        const newHeader = ndimArrayUtils.getSlice(index, this.header)
        return new MultiDimArray()._c2(this.data, newHeader)
    }

    inspect() {
        return this.toString()
    }

    toString() {
        for (const index of rawArrayUtils.getIndices(this.header.shape)) {
            const value = ndimArrayUtils.getData(index, this.data, this.header)
        }
    }
}