import MultiDimArray from '../../ndarray'
import NDArrayUtils from '../../utils/arrays/nd'
import TypeUtils from '../../utils/arrays/type'
import MathUtils from '../../utils/math'

export default class TensorOperator {
    static add(manyArrays) {
        return this.ElementwiseOperation(MathUtils.add, manyArrays)
    }
    static multiply(manyArrays) {
        return this.ElementwiseOperation(MathUtils.multiply, manyArrays)
    }
    static divide(manyArrays) {
        return this.ElementwiseOperation(MathUtils.divide, manyArrays)
    }
    static subtract(manyArrays) {
        return this.ElementwiseOperation(MathUtils.subtract, manyArrays)
    }
    static min(manyArrays) {
        return this.ElementwiseOperation(MathUtils.min, manyArrays)
    }
    static max(manyArrays) {
        return this.ElementwiseOperation(MathUtils.max, manyArrays)
    }

    static ElementwiseOperation(operation, ndArrays) {
        const newType = TypeUtils.compareTypes(ndArrays)
        const newShape = ndArrays[0].shape // all same shape
        const newData = new newType(ndArrays[0].data.length)
        const newHeader = new Header({
            shape: newShape
        })

        let i = 0
        for (const index of NDArrayUtils.getIndices(newShape))
            newData[i++] = operation(NDArrayUtils.getDataFromIndex(index, ndArrays))

        return [newData, newHeader, newType]
    }
}