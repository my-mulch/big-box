import ScalarOperator from '../scalar'
import utils from '../../top/utils'

export default class TensorOperator {
    static add(rawArray) { return rawArray.reduce(ScalarOperator.add) }
    static multiply(rawArray) { return rawArray.reduce(ScalarOperator.multiply, 1) }
    static divide(rawArray) { return rawArray.reduce(ScalarOperator.divide) }
    static subtract(rawArray) { return rawArray.reduce(ScalarOperator.subtract) }

    static min(rawArray) { return rawArray.reduce(ScalarOperator.min) }
    static max(rawArray) { return rawArray.reduce(ScalarOperator.max) }
    static square(rawArray) { return rawArray.map(ScalarOperator.square) }
    static equal(rawArray) { return rawArray.every(utils.array.sameValue) }

    static mean(rawArray) { return TensorOperator.add(rawArray) / rawArray.length }
    static norm(rawArray) { return Math.sqrt(TensorOperator.add(TensorOperator.square(rawArray))) }

    static * range(start, stop, step) { do yield start; while (start += step < stop) }

    static elementwise(operation, ...ndArrays) {
        return [...utils.ndim.indices(ndArrays[0].header.shape)].map(function (index) {
            return operation(utils.ndim.readMany(ndArrays, index))
        })
    }
}
