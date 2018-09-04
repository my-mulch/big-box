import Header from '../../ndarray/header.mjs'
import utils from '../../utils'

export default class MatrixOperator {
    static multiply(A, B) {
        const newTypedArray = utils.array.type.compareTypes(A.type, B.type)
        const newHeader = new Header({ shape: [A.header.shape[0], B.header.shape[1]] })
        const newData = new newTypedArray(A.header.shape[0] * B.header.shape[1])

        for (let r = 0, i = 0; r < newHeader.shape[0]; r++)
            for (let c = 0; c < newHeader.shape[1]; c++ , i++)
                for (let s = 0; s < A.header.shape[1]; s++)
                    newData[i] +=
                        utils.array.nd.dataForOne([r, s], A) *
                        utils.array.nd.dataForOne([s, c], B)


        return [newData, newHeader, newTypedArray]
    }
}
