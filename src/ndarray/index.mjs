import * as Matrix from '../math/matrix'

import RawArrayUtils from '../utils/arrays/raw'
import NDArrayUtils from '../utils/arrays/nd'
import TypeArrayUtils from '../utils/arrays/type'

import Header from './header'

export default class MultiDimArray {
    c1(A, type = 'float64') {
        const flatA = RawArrayUtils.flatten(A)
        const shapeA = RawArrayUtils.getShape(A)

        this.type = TypeArrayUtils.TYPE_MAP[type]
        this.data = new this.type(flatA)
        this.header = new Header({
            shape: shapeA
        })

        return this
    }

    c2(data, header, type) {
        this.data = data
        this.header = header
        this.type = type

        return this
    }

    static array(A, type = 'float64') {
        return new MultiDimArray().c1(A, type)
    }

    static arange(...args) {
        return new MultiDimArray().c1(NDArrayUtils.helperArange(args))
    }


    slice(...indices) {
        const newHeader = this.header.slice(indices)

        return newHeader.shape.length ?
            new MultiDimArray().c2(this.data, newHeader, this.type) :
            this.data[newHeader.offset]
    }

    reshape(...shape) {
        if (!this.header.contig)
            // if the array is not contigous, a reshape means data copy
            return new MultiDimArray().c2(
                new this.type(NDArrayUtils.getRawFlat(this)), 
                new Header({ shape }), 
                this.type)

        return new MultiDimArray().c2(this.data, this.header.reshape(shape))
    }

    dot(A) {
        const [newData, newHeader, newType] = Matrix.multiply(this, A)

        return new MultiDimArray().c2(newData, newHeader, newType)
    }

    T() {
        return new MultiDimArray().c2(this.data, this.header.transpose())
    }

    toRawArray() {
        const autoGenerator = NDArrayUtils.getValueSequenceAutoGenerator(this)

        return RawArrayUtils.createRawArray(this.header.shape, autoGenerator)
    }

    * toGenerator() {
        yield* this.toRawArray()
    }

    inspect() {
        return this.toString()
    }

    toString() {
        return NDArrayUtils.helperToString(this) + '\n'
    }
}