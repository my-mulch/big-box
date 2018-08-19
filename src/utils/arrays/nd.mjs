class NDArrayUtils {
    static getDataFromIndex(indices, ndArray) {
        return ndArray.data[
            // index returned
            ndArray.header.offset + indices.reduce(function (finalIndex, idxValue, dimension) {
                return finalIndex + idxValue * ndArray.header.stride[dimension]
            }, 0)
        ]
    }

    static getDataForHeader(ndArray) {
        return [...getIndices(ndArray.header.shape)].map(function (index) {
            return getDataFromIndex(index, ndArray)
        })
    }

    static helperToString(ndArray) {
        const templateArrayString = getTemplateArrayString(ndArray.header.shape)
        const automaticallyReturningGenerator = getAutoReturnGenerator(ndArray)
        const filledArrayString = templateArrayString.replace(/\[\$\]/g, automaticallyReturningGenerator)

        return formatArrStrLikeNumpy(filledArrayString, ndArray.header.shape.length)
    }

    static * getIndices(shape, index = []) {
        for (let i = 0; i < shape[0]; i++) {
            if (shape.length > 1)
                yield* getIndices(shape.slice(1), index.concat(i))
            else
                yield index.concat(i)
        }
    }

    // args: [start,] end [,step] //
    static helperArange(args) {
        if (args.length === 1)
            return [...getIntegerRange(0, args[0], 1)]
        if (args.length === 2)
            return [...getIntegerRange(args[0], args[1], 1)]
        if (args.length === 3)
            return [...getIntegerRange(args[0], args[1], args[2])]
    }

    static getAutoReturnGenerator(ndArray) {
        return autoReturnGenerator(getGenerator(getDataForHeader(ndArray)))
    }
}