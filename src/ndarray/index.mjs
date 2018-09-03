import TensorOperator from '../math/tensor'
import MatrixOperator from '../math/matrix'

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

        return this.header.shape ? this : this.data[this.header.offset]
    }

    static array(A, type = 'float64') {
        return new MultiDimArray().c1(A, type)
    }

    static arange(...args) {
        if (args.length === 1)
            return new MultiDimArray().c1([...Utils.math.getIntegerRange(0, args[0], 1)])
        if (args.length === 2)
            return new MultiDimArray().c1([...Utils.math.getIntegerRange(args[0], args[1], 1)])
        if (args.length === 3)
            return new MultiDimArray().c1([...Utils.math.getIntegerRange(args[0], args[1], args[2])])
    }

    static zeros(...shape) {
        return new MultiDimArray().c1(RawArrayUtils.createRawArray(shape))
    }

    dot(many) {
        const [newData, newHeader, newType] = MatrixOperator.multiply(this, A)

        return new MultiDimArray().c2(
            newData,
            newHeader,
            newType)
    }

    min(...axis) {
        if (!axis.length)
            return MathUtils.min(this.data)

        const [newData, newHeader, newType] = TensorOperator.min([...this.toGenerator(...axis)])

        return new MultiDimArray().c2(
            newData,
            newHeader,
            newType)
    }

    max(...axis) {
        if (!axis.length)
            return MathUtils.max(this.data)

        const [newData, newHeader, newType] = TensorOperator.max([...this.toGenerator(...axis)])

        return new MultiDimArray().c2(
            newData,
            newHeader,
            newType)
    }

    mean(...axis) {
        if (!axis.length)
            return MathUtils.mean(this.data)

        const [newData, newHeader, newType] = TensorOperator.mean([...this.toGenerator(...axis)])

        return new MultiDimArray().c2(
            newData,
            newHeader,
            newType)
    }

    norm(...axis) {
        if (!axis.length)
            return MathUtils.norm(this.data)

        const [newData, newHeader, newType] = TensorOperator.norm([...this.toGenerator(...axis)])

        return new MultiDimArray().c2(
            newData,
            newHeader,
            newType)
    }

    round(precision = 0) {
        return new MultiDimArray().c2(
            MathUtils.round(this.data, precision),
            this.header,
            this.type)
    }

    slice(...indices) {
        return new MultiDimArray().c2(
            this.data,
            this.header.slice(indices),
            this.type)
    }

    reshape(...shape) {
        // if the array is not contigous, a reshape means data copy
        if (!this.header.contig)
            return new MultiDimArray().c2(
                new this.type(this.toRawFlat()),
                new Header({ shape }),
                this.type)

        return new MultiDimArray().c2(
            this.data,
            this.header.reshape(shape),
            this.type)
    }

    T() {
        return new MultiDimArray().c2(
            this.data,
            this.header.transpose(),
            this.type)
    }

    

    * toGenerator(...axes) {
        for (let index of Utils.nd.getIndices(this.header.sliceAxis(axes)))
            yield this.slice(...NDArrayUtils.getAxisIndex(axis, index, this))
    }

    toRawFlat() {
        return [...this.toGenerator(...this.header.shape.keys())]
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