import NDArrayUtils from '../../utils/arrays/nd'
import TypeUtils from '../../utils/arrays/type'
import MathUtils from '../../utils/math'
import Header from '../../ndarray/header'

export default class TensorOperator {
    static add(A, B) {
        return this.ElementwiseOperation(A, B, MathUtils.add)
    }
    static multiply(A, B) {
        return this.ElementwiseOperation(A, B, MathUtils.multiply)
    }
    static divide(A, B) {
        return this.ElementwiseOperation(A, B, MathUtils.divide)
    }
    static subtract(A, B) {
        return this.ElementwiseOperation(A, B, MathUtils.subtract)
    }

    static ElementwiseOperation(A, B, operation) {
        const newType = TypeUtils.compareTypes(A.type, B.type)
        const newShape = A.header.shape
        const newSize = MathUtils.product(newShape)
        const newData = new newType(newSize)
        const newHeader = new Header({
            shape: newShape
        })

        let i = 0
        for (const index of NDArrayUtils.getIndices(newShape)) {
            newData[i++] = operation(
                NDArrayUtils.getDataFromIndex(index, A),
                NDArrayUtils.getDataFromIndex(index, B)
            )
        }

        return [newData, newHeader, newType]
    }
}