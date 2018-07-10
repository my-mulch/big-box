import * as rawArrayUtils from '../utils/array/raw'

export default class Header {
    constructor(arg) {
        if (arg instanceof Array) {
            this.shape = rawArrayUtils.getShape(arg)
            this.stride = rawArrayUtils.getStride(this.shape)
            this.offset = 0
        } else if (arg instanceof Object)
            this = arg
    }
}
