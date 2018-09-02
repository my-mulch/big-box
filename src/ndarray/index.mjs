import TensorOperator from '../math/tensor'
import * as Matrix from '../math/matrix'

import RawArrayUtils from '../utils/arrays/raw'
import NDArrayUtils from '../utils/arrays/nd'
import TypeArrayUtils from '../utils/arrays/type'
import FormatUtils from '../utils/arrays/format'

import MathUtils from '../utils/math'

import Header from './header'
import util from 'util'

export default class MultiDimArray {
    c1(A, type = 'float64') {
        const flatA = RawArrayUtils.flatten(A)
        const shapeA = RawArrayUtils.getShape(A)

        this.type = TypeArrayUtils.TYPE_MAP[type]
        this.data = new this.type(flatA)
        this.header = new Header({ shape: shapeA })

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

    static zeros(...shape) {
        return new MultiDimArray().c1(RawArrayUtils.createRawArray(shape))
    }

    add(many) {
        many.push(this)
        const [newData, newHeader, newType] = TensorOperator.add(many)

        return new MultiDimArray().c2(newData, newHeader, newType)
    }

    subtract(many) {
        many.push(this)
        const [newData, newHeader, newType] = TensorOperator.subtract(many)

        return new MultiDimArray().c2(newData, newHeader, newType)
    }

    multiply(many) {
        many.push(this)
        const [newData, newHeader, newType] = TensorOperator.multiply(many)

        return new MultiDimArray().c2(newData, newHeader, newType)
    }

    divide(many) {
        many.push(this)
        const [newData, newHeader, newType] = TensorOperator.divide(many)

        return new MultiDimArray().c2(newData, newHeader, newType)
    }

    min(...axis) {
        if (!axis.length)
            return MathUtils.min(this.data)

        const [newData, newHeader, newType] = TensorOperator.min([...this.toGenerator(axis)])
        return new MultiDimArray().c2(newData, newHeader, newType)
    }

    max(...axis) {
        if (!axis.length)
            return MathUtils.max(this.data)

        const [newData, newHeader, newType] = TensorOperator.max([...this.toGenerator(axis)])
        return new MultiDimArray().c2(newData, newHeader, newType)
    }

    mean(...axis) {
        if (!axis.length)
            return MathUtils.mean(this.data)

        const [newData, newHeader, newType] = TensorOperator.mean([...this.toGenerator(...axis)])
        return new MultiDimArray().c2(newData, newHeader, newType)
    }

    norm(...axis) {
        if (!axis.length)
            return MathUtils.norm(this.data)

        const [newData, newHeader, newType] = TensorOperator.norm([...this.toGenerator(axis)])
        return new MultiDimArray().c2(newData, newHeader, newType)
    }

    round(precision = 0) {
        return new MultiDimArray().c2(MathUtils.round(this.data, precision), this.header, this.type)
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
                new this.type(NDArrayUtils.getRawFlat(this)), // new data
                new Header({ shape }), // new header
                this.type // new type
            )

        return new MultiDimArray().c2(this.data, this.header.reshape(shape), this.type)
    }

    dot(A) {
        const [newData, newHeader, newType] = Matrix.multiply(this, A)

        return new MultiDimArray().c2(newData, newHeader, newType)
    }

    T() {
        return new MultiDimArray().c2(this.data, this.header.transpose(), this.type)
    }

    * toGenerator(...axis) {
        const sortedAxis = axis.sort()
        const axisSlice = this.header.shape.map(_ => ':')
        const axisIndices = sortedAxis.map(axis => this.header.shape[axis])

        for (let index of NDArrayUtils.getIndices(axisIndices)) {
            for (let i = 0; i < axis.length; i++)
                axisSlice[sortedAxis[i]] = index[i]

            yield this.slice(...axisSlice)
        }
    }

    toString() {
        return [...this.toGenerator(0)].map(function (slice) {
            return slice instanceof MultiDimArray
                ? slice.toString()
                : FormatUtils.formatNumber(slice)
        })
    }

    [util.inspect.custom]() {
        return this.toString()
    }
}