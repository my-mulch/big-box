import ScalarOperator from '../scalar'
import utils from '../../utils'

export default class TensorOperator {
    static add(rawArray) { return rawArray.reduce(ScalarOperator.add) }
    static multiply(rawArray) { return rawArray.reduce(ScalarOperator.multiply, 1) }
    static divide(rawArray) { return rawArray.reduce(ScalarOperator.divide) }
    static subtract(rawArray) { return rawArray.reduce(ScalarOperator.subtract) }
    static min(rawArray) { return rawArray.reduce(ScalarOperator.min) }
    static max(rawArray) { return rawArray.reduce(ScalarOperator.max) }
    static square(rawArray) { return rawArray.map(ScalarOperator.square) }
    static mean(rawArray) { return TensorOperator.add(rawArray) / rawArray.length }
    static norm(rawArray) { return Math.sqrt(TensorOperator.add(TensorOperator.square(rawArray))) }

    static equal(rawArray) {
        return rawArray.every(function (value, index, array) {
            return value === array[0]
        })
    }

    static * getIntegerRange(opts) {
        while (opts.start < opts.end) {
            yield opts.start
            opts.start += opts.step
        }
    }

    static elementwise(operation, ...ndArrays) {

        function operateAtIndex(index) {
            return operation(utils.ndim.readMany(ndArrays, index))
        }

        return [...utils.ndim.indices(ndArrays[0].header.shape)].map(operateAtIndex)
    }
}