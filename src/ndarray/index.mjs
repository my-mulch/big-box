import * as utils from '../utils'

export default class MultiDimArray {

    constructor() {}

    _c1(A, type = Float64Array) {
        this.data = new type(utils.flatten(A))

        this.header = {}
        this.header.shape = utils.getShape(A)
        this.header.stride = utils.getStride(this.header.shape)
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
        const newHeader = utils.getHeader(index, this.header)

        if (newHeader.shape.length)
            return new MultiDimArray()._c2(this.data, newHeader)
        else
            return this.data[newHeader.offset]
    }

    inspect() {
        return this.toString()
    }

    toString() {
        return "array(" + utils.helperToString(this.data, this.header) + ")"
    }
}