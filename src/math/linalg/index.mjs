import Header from '../../ndarray/header.mjs'
import utils from '../../utils'

export default class LinearAlgebraOperator {
    static matMult(A, B) {
        const newTypedArray = utils.array.type.compareTypes(A.type, B.type)
        const newHeader = new Header({ shape: [A.header.shape[0], B.header.shape[1]] })
        const newData = new newTypedArray(A.header.shape[0] * B.header.shape[1])

        for (let r = 0, i = 0; r < newHeader.shape[0]; r++)
            for (let c = 0; c < newHeader.shape[1]; c++ , i++)
                for (let s = 0; s < A.header.shape[1]; s++)
                    newData[i] +=
                        utils.array.nd.read(A, [r, s]) *
                        utils.array.nd.read(B, [s, c])


        return [newData, newHeader, newTypedArray]
    }

    static cross(A, B) {
        return A.copy()
            .set(0).to(A.slice(1) * B.slice(2) - A.slice(2) * B.slice(1))
            .set(1).to(A.slice(2) * B.slice(0) - A.slice(0) * B.slice(2))
            .set(2).to(A.slice(0) * B.slice(1) - A.slice(1) * B.slice(0))
    }

    static invert(A, I) {
        A = A.copy()

        for (let i = 0; i < A.header.shape[0]; i += 1) {
            let temp, pivot

            pivot = A.slice(i, i)

            if (!pivot) {
                for (let ii = i + 1; ii < A.header.shape[0]; ii += 1) {
                    if (A.slice(ii, i)) {
                        temp = A.slice(i)
                        A.set(i).to(A.slice(ii))
                        A.set(ii).to(temp)

                        temp = I.slice(i)
                        I.set(i).to(I.slice(ii))
                        I.set(ii).to(temp)

                        break
                    }
                }
            }

            pivot = A.slice(i, i)

            A.set(i).to(A.slice(i).divide(pivot))
            I.set(i).to(I.slice(i).divide(pivot))

            for (let ii = 0; ii < A.header.shape[0]; ii++) {

                if (ii == i) continue

                const knockout = A.slice(ii, i)
                A.set(ii).to(A.slice(ii).subtract(A.slice(i).multiply(knockout)))
                I.set(ii).to(I.slice(ii).subtract(I.slice(i).multiply(knockout)))
            }
        }

        return I
    }
}
