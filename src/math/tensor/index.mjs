import MultiDimArray from '../../ndarray'
import NDArrayUtils from '../../utils/arrays/nd'
import TypeUtils from '../../utils/arrays/type'
import MathUtils from '../../utils/math'
import Header from '../../ndarray/header'

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
    static mean(manyArrays){
        return this.ElementwiseOperation(MathUtils.mean, manyArrays)
    }

    static ElementwiseOperation(operation, ndArrays) {
        const newType = TypeUtils.compareManyTypes(ndArrays)
        const newData = new newType(ndArrays[0].data.length)
        const newHeader = new Header({ shape: ndArrays[0].header.shape })

        let i = 0
        for (const index of NDArrayUtils.getIndices(ndArrays[0].header.shape))
            newData[i++] = operation(NDArrayUtils.getManyDataFromIndex(index, ndArrays))

        return [newData, newHeader, newType]
    }
}