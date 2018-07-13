import * as utils from '../utils'

export default class Header {
    constructor(opts) {
        this.shape = opts.shape

        this.stride = opts.stride ? opts.stride : utils.getStride(this.shape)
        this.offset = opts.offset ? opts.offset : 0
        this.contig = opts.contig ? opts.contig : true
    }

    copy() {
        return new Header(JSON.parse(JSON.stringify(this)))
    }
}