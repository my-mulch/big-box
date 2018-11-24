import ScalarOperator from '../math/scalar'
import utils from '../top/utils'

export default class Header {
    constructor(opts) {
        this.shape = 'shape' in opts ? opts.shape : []
        this.offset = 'offset' in opts ? opts.offset : 0
        this.contig = 'contig' in opts ? opts.contig : true

        this.size = this.shape.reduce(ScalarOperator.multiply)

        this.stride = {}
        this.stride.local = utils.header.stridesFor(this.shape, 1)
        this.stride.global = 'stride' in opts.stride ? opts.stride : this.stride.local
        this.lastStride = this.stride.global.slice(-1).pop()
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
        const shape = utils.header.resolveReshape(newShape, this.size)
        const stride = utils.header.stridesFor(shape, this.lastStride)

        return new Header({ shape, stride })
    }

    fullySpecified(index) {
        return index.length === this.shape.length
            && index.every(function (value) { value.constructor === Number })
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
