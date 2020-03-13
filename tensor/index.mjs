import Type from '../types/index.mjs'
import Header from '../header/index.mjs'
import config from '../resources/config.mjs'
import __Math__ from '../operations/arithmetic/index.mjs'

export default class Tensor {
    constructor(data, header) {
        this.data = data
        this.header = header
    }

    static parse(data) {
        if (data === undefined)
            throw "Attempting to get shape of something undefined"

        const shape = []

        while (data[0].constructor === Array)
            shape.push(data.length), data = data[0]

        return [shape, Type.configolveSize(data.length)]
    }

    static flatten(data, flat = [], fi = [0]) {
        if (data.constructor !== Array)
            return flat[fi[0]++] = data

        for (let i = 0; i < data.length; i++)
            Tensor.flatten(data[i], flat, fi)

        return flat
    }

    static tensor(data) {
        if (data === undefined)
            return Tensor.zeros([])

        if (data.constructor === Tensor)
            return data

        if (data.constructor === Number)
            data = [data]

        if (data.constructor === Array) {
            const [shape, type] = Tensor.parse(data)
            const size = shape.reduce(__Math__.multiply, 1)

            return new Tensor(
                Tensor.flatten(data, new type.array(size * type.size)),
                new Header({ type, shape, size }))
        }

        if (Type.isArray(data))
            return new Tensor(data,
                new Header({ shape: [data.length], type: Type.configolveArray(data) }))
    }

    static zerosLike(tensor) {
        if (tensor === undefined)
            throw "Attempting to create tensor from undefined"

        return new Tensor(
            new tensor.header.type.array(tensor.header.size * tensor.header.type.size),
            new Header({
                size: tensor.header.size,
                type: tensor.header.type,
                shape: tensor.header.shape,
            }))
    }

    static zeros(shape, type = Tensor.Float32) {
        if (shape === undefined)
            throw "Attempting to create tensor with undefined shape"

        const size = shape.reduce(__Math__.multiply, 1)

        return new Tensor(
            new type.array(size * type.size),
            new Header({ shape, size, type }))
    }

    static onesLike(tensor) {
        if (tensor === undefined)
            throw "Attempting to create tensor from undefined"

        const ones = new Tensor(
            new tensor.header.type.array(tensor.header.size * tensor.header.type.size),
            new Header({
                size: tensor.header.size,
                type: tensor.header.type,
                shape: tensor.header.shape,
            }))

        ones.data.fill(1)

        return ones
    }

    static ones(shape, type = Tensor.Float32) {
        if (shape === undefined)
            throw "Attempting to create tensor with undefined shape"

        const size = shape.reduce(__Math__.multiply, 1)

        const ones = new Tensor(
            new type.array(size * type.size),
            new Header({ shape, size, type }))

        ones.data.fill(1)

        return ones
    }

    static arange(start = 0, stop, step = 1) {
        if (stop === undefined)
            throw "You must specify when to stop the range"

        const shape = [__Math__.round((stop - start) / step)]
        const size = shape[0]
        const type = Tensor.Float32

        const tensor = new Tensor(
            new type.array(size * type.size),
            new Header({ type, shape, size }))

        for (let i = start, j = 0; i < stop; i += step, j++)
            tensor.data[j] = i

        return tensor
    }

    static linspace(start, stop, num = 50) {
        if (start === undefined || stop === undefined)
            throw "You must specify start and stop"

        const size = num
        const shape = [num]
        const type = Tensor.Float32
        const step = (stop - start) / (num - 1)

        const tensor = new Tensor(
            new type.array(size * type.size),
            new Header({ type, shape, size }))

        for (let i = start, j = 0; i <= stop; i += step, j += type.size)
            tensor.data[j] = i

        return tensor
    }

    static rand(shape, type) {
        if (shape === undefined)
            throw "Attempting to create tensor with undefined shape"

        type = Tensor.Float32 || type
        const size = shape.reduce(__Math__.multiply, 1)

        const tensor = new Tensor(
            new type.array(size * type.size),
            new Header({ shape, type, size }))

        for (let i = 0; i < tensor.data.length; i++)
            tensor.data[i] = __Math__.random()

        return tensor
    }

    static randrange(low, high, shape) {
        if (low === undefined || high === undefined)
            throw "You must specify start and stop"

        if (shape === undefined)
            throw "Attempting to create randrange tensor with undefined shape"

        const type = Tensor.Float32
        const size = shape.reduce(__Math__.multiply, 1)

        const tensor = new Tensor(
            new type.array(size * type.size),
            new Header({ shape, type, size }))

        for (let i = 0; i < tensor.data.length; i++)
            tensor.data[i] = low + __Math__.floor(__Math__.random() * (high - low))

        return tensor
    }

    static eye(shape) {
        if (shape === undefined)
            throw "Attempting to create tensor with undefined shape"

        const type = Tensor.Float32
        const size = shape.reduce(__Math__.multiply, 1)

        const tensor = new Tensor(
            new type.array(size * type.size),
            new Header({ shape, size, type }))

        const diagonal = tensor.header.strides.reduce(__Math__.add)
        const numDiags = __Math__.min(...tensor.header.shape)

        for (let i = 0; i < numDiags * diagonal; i += diagonal)
            tensor.data[i] = 1

        return tensor
    }

    astype(type) {
        if (type === undefined)
            throw "Attempting to convert tensor to undefined type"

        if (type.size === this.header.type.size)
            return this

        if (this.header.size === 1)
            return this

        const raw = this.toRawFlat()
        const data = new type.array(this.header.size * type.size)

        const minSize = __Math__.min(type.size, this.header.type.size)

        for (let i = 0, j = 0; i < raw.length; i += this.header.type.size, j += type.size)
            for (let offset = 0; offset < minSize; offset++)
                data[j + offset] = raw[i + offset]

        return new Tensor(data, new Header({ type, shape: this.header.shape }))
    }

    view(type) {
        if (type === undefined)
            throw "Attempting to view tensor as undefined type"

        if (type === this.header.type)
            return this

        if (!this.header.isContig)
            return this

        return new Tensor(this.data, this.header.view(type))
    }

    copy() {
        return new Tensor(this.data.slice(), this.header)
    }

    ravel() {
        return Tensor.tensor(this.toRaw(), this.header.type).reshape([-1])
    }

    slice(region) {
        if (region === undefined)
            throw 'You must specify a region to slice'

        return new Tensor(this.data, this.header.slice(region))
    }

    T() {
        return new Tensor(this.data, this.header.transpose())
    }

    reshape(shape) {
        if (shape === undefined)
            throw 'You must specify reshape dimensions'

        if (!this.header.isContig)
            return Tensor.tensor(this.toRaw(), this.header.type).reshape(shape)

        return new Tensor(this.data, this.header.reshape(shape))
    }

    visit(operation, index = this.header.offset, depth = 0) {
        if (!this.header.shape.length || depth === this.header.shape.length)
            return operation(index)

        return [...new Array(this.header.shape[depth]).keys()].map(function (i) {
            return this.visit(operation, i * this.header.strides[depth] + index, depth + 1)
        }, this)
    }

    toStringAtIndex(index, string = '') {
        for (let i = 0; i < this.header.type.size; i++) {
            const sign = __Math__.sign(this.data[index + i]) < 0 ? '-' : '+'
            const number = __Math__.abs(this.data[index + i])

            string += `${sign}${number.toFixed(config.PRECISION)}${config.SYMBOL_FROM_ID[i]}`
        }

        if (!string)
            return '0'

        if (string.startsWith('+'))
            return string.slice(1)

        return string
    }

    toRawAtIndex(index) {
        const result = []

        for (let i = 0; i < this.header.type.size; i++)
            result.push(this.data[index + i])

        return result
    }

    toRaw() {
        return this.visit(this.toRawAtIndex.bind(this))
    }

    toRawFlat() {
        return this.toRaw().flat(Number.POSITIVE_INFINITY)
    }

    toIndices() {
        const indices = []
        this.visit(function (index) { indices.push(index) })
        return indices
    }

    toPretty() {
        return this.visit(this.toStringAtIndex.bind(this))
    }

    toString() {
        return JSON
            .stringify(this.toPretty())
            .replace(config.ARRAY_SPACER, config.ARRAY_REPLACER)
    }
}
