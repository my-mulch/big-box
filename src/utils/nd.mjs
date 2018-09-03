import constants from '../contants.mjs'

export default class NDArrayUtils {
    static dataForOne(indices, ndArray) {
        return ndArray.data[
            // gets flat index into data array
            ndArray.header.offset + indices.reduce(function (finalIndex, idxValue, dimension) {
                return finalIndex + idxValue * ndArray.header.stride[dimension]
            }, 0)
        ]
    }

    static dataForMany(indices, ndArrays) {
        return ndArrays.map(nd => this.dataForOne(indices, nd))
    }

    static * indices(shape, index = []) {
        if (shape[0] === constants.ND_SLICE_CHARACTER)
            yield* this.indices(shape.slice(1), index.concat(shape[0]))

        for (let i = 0; i < shape[0]; i++)
            shape.length > 1
                ? yield* this.indices(shape.slice(1), index.concat(i))
                : yield index.concat(i)
    }

}