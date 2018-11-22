import ScalarOperator from '../math/scalar'
import utils from '../top/utils'

export default class Header {
    constructor(opts) {
        this.stride = {}

        this.shape = 'shape' in opts ? opts.shape : []
        this.offset = 'offset' in opts ? opts.offset : 0
        this.contig = 'contig' in opts ? opts.contig : true

        this.stride.local = this.shape.reduceRight(utils.header.reshape.stride.bind(this), [1])
        this.stride.global = 'stride' in opts.stride ? opts.stride : this.stride.local

        this.size = this.shape.reduce(ScalarOperator.multiply)
    }

    copy() {
        return new Header(JSON.parse(JSON.stringify(this)))
    }

    slice(index) {
        let offset = this.offset
        let contig = utils.header.isContiguousSlice(index)

        const shape = []
        const stride = []

        for (let i = 0; i < this.shape.length; i++) {

            if (index[i].constructor === Number)
                offset += this.stride[i] * index[i]

            else if (index[i].constructor === String) {
                let [low, high] = index[i].split(constants.ND_SLICE_CHARACTER).map(Number)

                low = (low + this.shape[i]) % this.shape[i]
                high = (high + this.shape[i]) % this.shape[i]

                offset += this.stride[i] * low

                shape.push(high - low)
                stride.push(this.stride[i])
            }

            else if (index[i] === constants.ND_SLICE_CHARACTER) {
                shape.push(this.shape[i])
                stride.push(this.stride[i])
            }
        }

        return new Header({ shape, stride, offset, contig })
    }

    transpose() {
        const shape = this.shape.slice().reverse()
        const stride = this.stride.slice().reverse()
        const contig = false

        return new Header({ shape, stride, contig })
    }

    reshape(newShape) {
        const shape = utils.header.resolveReshape(newShape)
        const stride = utils.header.stridesFor(shape, this.lastStride)

        return new Header({ shape, stride })
    }

    fullySpecified(indices) {
        return indices.length === this.shape.length
            && indices.every(function (index) { index.constructor === Number })
    }

    flattenIndex(index) {
        let result = this.offset

        for (let i = 0; i < this.stride.local.length; i++)
            result += index[i] * this.stride[i]

        return result
    }

    inflateIndex(index) {
        let result = this.offset

        for (let i = 0; i < this.stride.local.length; i++)
            result += Math.floor(index / this.stride.local[i]) % this.shape[i]

        return result
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
