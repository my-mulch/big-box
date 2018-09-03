import utils from '../../utils'
export default class MatrixOperator { }

function multiply(A, B) {

    // const sharedDim = A.header.shape[1]
    // const newType = TypeUtils.compareTypes(A.type, B.type)
    // const newShape = [A.header.shape[0], B.header.shape[1]]
    // const newHeader = new Header({ shape: newShape })
    // const newData = new newType(MathUtils.multiply(newShape))


    // for (let r = 0, i = 0; r < newHeader.shape[0]; r++) {
    //     for (let c = 0; c < newHeader.shape[1]; c++) {
    //         for (let s = 0; s < sharedDim; s++) {
    //             newData[i] +=
    //                 NDArrayUtils.getData([r, s], A) *
    //                 NDArrayUtils.getData([s, c], B)
    //         }
    //         i++
    //     }
    // }

    // return [newData, newHeader, newType]
}
