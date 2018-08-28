import MathUtils from '../math'
import RawArrayUtils from './raw'
import FormatUtils from './format'

export default class NDArrayUtils {
    static getDataFromIndex(indices, ndArrays) {
        const flatIndex = this.getFlatIndexFromMultiDim(indices, ndArrays[0])
        return ndArrays.map(nd => nd.data[flatIndex])
    }

    static getFlatIndexFromMultiDim(indices, ndArray) {
        return ndArray.header.offset + indices.reduce(function (finalIndex, idxValue, dimension) {
            return finalIndex + idxValue * ndArray.header.stride[dimension]
        }, 0)
    }

    static * getValueSequenceGenerator(ndArray) {
        for (const index of this.getIndices(ndArray.header.shape))
            yield this.getDataFromIndex(index, ndArray)
    }

    static getRawFlat(ndArray) {
        return [...this.getValueSequenceGenerator(ndArray)]
    }

    static getValueSequenceAutoGenerator(ndArray) {
        const valueSequenceGenerator = this.getValueSequenceGenerator(ndArray)

        return RawArrayUtils.getAutoInvokingGenerator(valueSequenceGenerator)
    }

    static helperToString(ndArray) {
        const templateArrayString = FormatUtils.getTemplateArrayString(ndArray.header.shape)
        const autoReturningGeneratorFunction = this.getValueSequenceAutoGenerator(ndArray)
        const filledArrayString = templateArrayString.replace(/\[\$\]/g, autoReturningGeneratorFunction)

        return FormatUtils.formatArrStrLikeNumpy(filledArrayString, ndArray.header.shape.length)
    }

    static * getIndices(shape, index = []) {
        for (let i = 0; i < shape[0]; i++) {
            if (shape.length > 1)
                yield* this.getIndices(shape.slice(1), index.concat(i))
            else
                yield index.concat(i)
        }
    }

    static helperArange(args) {
        if (args.length === 1)
            return [...MathUtils.getIntegerRange(0, args[0], 1)]
        if (args.length === 2)
            return [...MathUtils.getIntegerRange(args[0], args[1], 1)]
        if (args.length === 3)
            return [...MathUtils.getIntegerRange(args[0], args[1], args[2])]
    }
}