import ScalarOperator from '../scalar'
import Header from '../../ndarray/header'
import utils from '../../utils'

export default class TensorOperator {
    static round(rawArray, precision) { return rawArray.map(e => e.toFixed(precision)) }
    static add(rawArray) { return rawArray.reduce(ScalarOperator.add) }
    static multiply(rawArray) { return rawArray.reduce(ScalarOperator.multiply) }
    static divide(rawArray) { return rawArray.reduce(ScalarOperator.divide) }
    static subtract(rawArray) { return rawArray.reduce(ScalarOperator.subtract) }
    static min(rawArray) { return rawArray.reduce(ScalarOperator.min) }
    static max(rawArray) { return rawArray.reduce(ScalarOperator.max) }
    static square(rawArray) { return rawArray.map(ScalarOperator.square) }
    static mean(rawArray) { return TensorOperator.add(rawArray) / rawArray.length }
    static norm(rawArray) { return Math.sqrt(TensorOperator.add(TensorOperator.square(rawArray))) }

    static elementwise(operation, ndArrays) {
        const newType = utils.array.type.compareManyTypes(ndArrays)
        const newData = new newType(ndArrays[0].data.length)
        const newHeader = new Header({ shape: ndArrays[0].header.shape })

        let i = 0
        for (const index of utils.array.nd.indices(newHeader.shape))
            newData[i++] = operation(utils.array.nd.dataForMany(index, ndArrays))

        return [newData, newHeader, newType]
    }
}