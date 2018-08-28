import NDArrayUtils from '../../utils/arrays/nd'
import TypeUtils from '../../utils/arrays/type'
import MathUtils from '../../utils/math'
import Header from '../../ndarray/header'

export function multiply(A, B) {

    const sharedDim = A.header.shape[1]
    const newType = TypeUtils.compareTypes(A.type, B.type)
    const newShape = [A.header.shape[0], B.header.shape[1]]
    const newHeader = new Header({ shape: newShape })
    const newData = new newType(MathUtils.multiply(newShape))
    

    for (let r = 0, i = 0; r < newHeader.shape[0]; r++) {
        for (let c = 0; c < newHeader.shape[1]; c++) {
            for (let s = 0; s < sharedDim; s++) {
                newData[i] +=
                    NDArrayUtils.getDataFromIndex([r, s], A) *
                    NDArrayUtils.getDataFromIndex([s, c], B)
            }
            i++
        }
    }

    return [newData, newHeader, newType]
}
