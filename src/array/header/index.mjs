import { multiply } from '../../ops/element'
import { SLICE_CHARACTER } from '../../contants'
import { getStrides, isContiguousSlice, resolveReshape } from './utils'

export default class Header {

    constructor(opts) {
        this.shape = 'shape' in opts ? opts.shape : []
        this.offset = 'offset' in opts ? opts.offset : 0
        this.contig = 'contig' in opts ? opts.contig : true
        this.strides = 'strides' in opts ? opts.strides : getStrides(this.shape)

        this.indices = [...this.shape.keys()]
        this.size = this.shape.reduce(multiply, 1)
        this.lastStride = this.strides[this.strides.length - 1]
    }

    copy() {
        return new Header(JSON.parse(JSON.stringify(this)))
    }

    axisSlice(axes) {
        return new Header({
            shape: axes[1].map((function (axis) {
                return this.shape[axis]
            }).bind(this))
        })
    }

    slice(index) {
        const shape = new Array()
        const strides = new Array()
        const contig = isContiguousSlice(index)

        let offset = this.offset

        for (let i = 0; i < this.shape.length; i++) {

            /**
             *  If the index is a ':', the user wants that entire dimension 
             * */

            if (index[i] === SLICE_CHARACTER)
                shape.push(this.shape[i]), strides.push(this.strides[i])

            /** 
             * If the index is a number, the user wants that index. duh. 
             * */

            else if (!isNaN(index[i]))
                offset += this.strides[i] * +index[i]

            /** 
             * If the index is a slice of the form 'a:b', the user wants a slice from a to b 
            */

            else if (index[i].constructor === String) {
                let [low, high] = index[i].split(SLICE_CHARACTER).map(Number)

                offset += this.strides[i] * low

                shape.push(high - low)
                strides.push(this.strides[i])
            }
        }

        return new Header({ shape, strides, offset, contig })
    }

    transpose() {
        return new Header({
            shape: this.shape.slice().reverse(),
            strides: this.strides.slice().reverse(),
            contig: false
        })
    }

    reshape(newShape) {
        const resolvedShape = resolveReshape(newShape, this.size)

        return new Header({
            shape: resolvedShape,
            strides: getStrides(resolvedShape, this.lastStride)
        })
    }

    fullySpecified(index) {
        return index.length === this.shape.length
            && index.every(function (value) { return value.constructor === Number })
    }
}
