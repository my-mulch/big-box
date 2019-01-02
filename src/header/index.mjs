import { prod } from '../math/elementwise'
import { SLICE_CHARACTER, SHAPE, OFFSET, CONTIG } from '../contants'
import { stridesFor, isContiguousSlice, resolveReshape } from './utils'

export default class Header {

    constructor(opts) {
        this.shape = SHAPE in opts ? opts.shape : new Array()
        this.offset = OFFSET in opts ? opts.offset : 0
        this.contig = CONTIG in opts ? opts.contig : true

        this.size = this.shape.reduce(prod)
        this.strides = stridesFor(this.shape, 1)
        this.lastStride = this.strides[this.strides.length - 1]
    }

    copy() {
        return new Header(JSON.parse(JSON.stringify(this)))
    }

    slice(index) {
        const shape = new Array()
        const strides = new Array()

        let offset = this.offset
        let contig = isContiguousSlice(index)

        for (let i = 0; i < this.shape.length; i++) {

            /**
             *  If the index is a ':', the user wants that entire dimension 
             * */

            if (index[i] === SLICE_CHARACTER)
                shape.push(this.shape[i]), strides.push(this.strides.global[i])

            /** 
             * If the index is a number, the user wants that index. duh. 
             * */

            else if (index[i].constructor === Number)
                offset += this.strides.global[i] * index[i]

            /** 
             * If the index is a slice of the form 'a:b', the user wants a slice from a to b 
             * The logic below supports negative indexing. It's a python thing, if you ain't know
            */

            else if (index[i].constructor === String) {
                let [low, high] = index[i].split(SLICE_CHARACTER).map(Number)

                low = (low + this.shape[i]) % this.shape[i]
                high = (high + this.shape[i]) % this.shape[i]

                offset += this.strides.global[i] * low

                shape.push(high - low)
                strides.push(this.strides.global[i])
            }
        }

        return new Header({ shape, strides, offset, contig })
    }

    transpose() {
        const shape = this.shape.slice().reverse()
        const strides = this.strides.slice().reverse()
        const contig = false

        return new Header({ shape, strides, contig })
    }

    reshape(newShape) {
        const shape = resolveReshape(newShape, this.size)
        const strides = stridesFor(shape, this.lastStride)

        return new Header({ shape, strides })
    }

    fullySpecified(index) {
        return index.length === this.shape.length
            && index.every(function (value) { value.constructor === Number })
    }
}
