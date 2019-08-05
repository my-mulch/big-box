import {
    PARTIAL_SLICE_REGEX, NUMBER_REGEX,
    SLICE_CHARACTER, AXIS_INNER_CHARACTER, AXIS_RESULT_CHARACTER,
    SHAPE, OFFSET, CONTIG, STRIDES, __Math__
} from '../../resources'

import { getStrides, isContiguousSlice, resolveReshape } from './utils'

export default class Header {

    constructor(opts) {
        this.shape = SHAPE in opts ? opts.shape : []
        this.offset = OFFSET in opts ? opts.offset : 0
        this.contig = CONTIG in opts ? opts.contig : true
        this.strides = STRIDES in opts ? opts.strides : getStrides(this.shape)

        this.id = `${this.shape}|${this.strides}|${this.offset}`
        this.size = this.shape.reduce(__Math__.multiply, 1)
        this.lastStride = this.strides[this.strides.length - 1]
    }

    copy() {
        return new Header(JSON.parse(JSON.stringify(this)))
    }

    slice(index) {
        const shape = new Array()
        const strides = new Array()
        const contig = isContiguousSlice(index)

        let offset = this.offset

        for (let i = 0; i < this.shape.length; i++) {

            /**
             *  If the index is a ':', the user wants that entire dimension 
             */

            if (index[i] === SLICE_CHARACTER || index[i] === undefined)
                shape.push(this.shape[i]), strides.push(this.strides[i])

            /** 
             * If the index is a slice of the form 'a:b', the user wants a slice from a to b 
            */

            else if (PARTIAL_SLICE_REGEX.test(index[i])) {
                let [low, high] = index[i].split(SLICE_CHARACTER).map(Number)

                if (high === 0)
                    high = this.shape[i]

                offset += this.strides[i] * low

                shape.push(high - low)
                strides.push(this.strides[i])
            }

            /** 
             * If the index is a number, the user wants that index
             */

            else if (NUMBER_REGEX.test(index[i]))
                offset += this.strides[i] * index[i]

        }

        return new Header({ shape, strides, offset, contig })
    }

    transpose() {
        return new Header({
            shape: this.shape.slice().reverse(),
            strides: this.strides.slice().reverse(),
            offset: this.offset,
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
}
