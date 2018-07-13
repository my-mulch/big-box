import * as utils from '../../utils'
import Header from '../../ndarray/header'

export function multiply(A, B) {
    const newHeader = new Header({
        shape: [A.header.shape[1], B.header.shape[0]]
    })

    

}