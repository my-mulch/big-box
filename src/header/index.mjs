import ScalarOperator from '../math/scalar'
import utils from '../top/utils'

export default class Header {
    constructor(opts) {
        this.stride = {}

        this.shape = 'shape' in opts ? opts.shape : []
        this.offset = 'offset' in opts ? opts.offset : 0
        this.contig = 'contig' in opts ? opts.contig : true

        this.stride.local = this.shape.reduceRight(utils.header.reshape.stride, [1])
        this.stride.global = 'stride' in opts.stride ? opts.stride : this.stride.local

        this.size = this.shape.reduce(ScalarOperator.multiply)
    }

    copy() {
        return new Header(JSON.parse(JSON.stringify(this)))
    }

    slice(indices) {
        return new Header({
            offset: indices.reduce(utils.header.slice.offset, this.offset),
            shape: indices.reduce(utils.header.slice.shape, new Array()),
            stride: indices.reduce(utils.header.slice.stride, new Array()),
            contig: !indices.some(utils.header.slice.discontiguous)
        })
    }

    transpose() {
        return new Header({
            shape: this.shape.slice().reverse(),
            stride: this.stride.slice().reverse(),
            contig: false
        })
    }

    reshape(shapeRaw, shapeProcessed = shapeRaw.map(utils.header.reshape.resolve)) {
        return new Header({
            shape: shapeProcessed,
            stride: shapeProcessed.reduceRight(utils.header.reshape.stride, [this.stride.slice(-1).pop()])
        })
    }

    fullySpecified(indices) {
        return indices.length === this.shape.length && indices.every(utils.header.indices.isNumber)
    }

    flatten(indices) {
        return indices.reduce(utils.header.indices.flatten, this.offset)
    }

    inflate(index) {
        return this.stride.local.reduce(utils.header.indices.inflate(index), this.offset)
    }

    axis(axes) {
        axes.sort(ScalarOperator.subtract)

        return this.shape.map(function (dim, i) {
            if (axes[0] !== i)
                return ':'

            axes.shift()
            return dim
        })
    }

}
