import constants from '../contants.mjs'

export default class NDArrayUtils {
    static access(ndArray, index) {
        return ndArray.data[
            // gets flat index into data array
            ndArray.header.offset + index.reduce(function (finalIndex, idxValue, dimension) {
                return finalIndex + idxValue * ndArray.header.stride[dimension]
            }, 0)
        ]
    }

    static accessMany(ndArrays, index) {
        return ndArrays.map(function (ndArray) {
            if (typeof ndArray === constants.NUMBER)
                return ndArray

            if (ndArray.header.shape.length !== index.length)
                return this.access(ndArray, index.slice(-ndArray.header.shape.length))

            return this.access(ndArray, index)
        }, this)
    }

    static * indices(shape, index = []) {
        if (shape[0] === undefined)
            yield index

        if (shape[0] === constants.ND_SLICE_CHARACTER)
            yield* this.indices(shape.slice(1), index.concat(constants.ND_SLICE_CHARACTER))

        for (let i = 0; i < shape[0]; i++)
            yield* this.indices(shape.slice(1), index.concat(i))
    }
}