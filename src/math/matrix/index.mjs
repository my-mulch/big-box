import * as utils from '../../utils'
import Header from '../../ndarray/header'

export function multiply(A, B, type = Float64Array) {
    const shared = A.header.shape[1]
    const newHeader = new Header({
        shape: [A.header.shape[0], B.header.shape[1]]
    })

    const newData = new type(utils.product(newHeader.shape))

    for (let r = 0, i = 0; r < newHeader.shape[0]; r++) {
        for (let c = 0; c < newHeader.shape[1]; c++) {
            for (let s = 0; s < shared; s++) {
                newData[i] +=
                    utils.getDataFromIndex([r, s], A) *
                    utils.getDataFromIndex([s, c], B)
            }
            i++
        }
    }

    return [newData, newHeader]

}