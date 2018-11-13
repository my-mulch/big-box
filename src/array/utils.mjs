import constants from '../contants'

export default class ArrayUtils {

    static * indices(shape, index = []) {
        if (shape[0] === undefined)
            yield index

        if (shape[0] === constants.ND_SLICE_CHARACTER)
            yield* this.indices(shape.slice(1), index.concat(constants.ND_SLICE_CHARACTER))

        for (let i = 0; i < shape[0]; i++)
            yield* this.indices(shape.slice(1), index.concat(i))
    }

    static broadcast(ndArray, index) {
        if (ndArray.constructor === Number)
            return ndArray

        if (ndArray.header.shape.length !== index.length)
            return this.read(ndArray, index.slice(-ndArray.header.shape.length))

        return this.read(ndArray, index)
    }

    static lookup(ndArray, index) {
        // gets flat index from multidim index
        return ndArray.header.offset + index.reduce(function (finalIndex, idxValue, dimension) {
            return finalIndex + idxValue * ndArray.header.stride[dimension]
        }, 0)
    }

    static write(ndArray, index, data) {
        ndArray.data[this.lookup(ndArray, index)] = data

        return ndArray
    }

    static read(ndArray, index) {
        return ndArray.data[this.lookup(ndArray, index)]
    }

    static readMany(ndArrays, index) {
        return ndArrays.map(function (ndArray) {
            return this.broadcast(ndArray, index)
        }, this)
    }

    static * flatten(rawArray) {
        for (let i = 0; i < rawArray.length; i++) {
            if (Array.isArray(rawArray[i]))
                yield* this.flatten(rawArray[i])

            else if (rawArray[i].constructor === NUMBER)
                yield rawArray[i]

            else // it is a MultiDimArray
                yield* this.flatten(rawArray[i].toRawFlat())
        }
    }

    static getShape(rawArray, shape = []) {
        if (!rawArray.length) return shape

        return this.getShape(rawArray[0], shape.concat(rawArray.length))
    }

    static sameValue(value, _, array) { return value === array[0] }
}
