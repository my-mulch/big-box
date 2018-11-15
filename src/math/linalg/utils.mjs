import TensorOperator from '../tensor'
import ScalarOperator from '../scalar'

export default class LinearAlgebraUtils {
    static dotProduct(i, r, c, A, B) {
        if (i < 0) return 0

        return this.dotProduct(i - 1, r, c, A, B)
            + (A.header.shape.length === 1 ? A.slice(i) : A.slice(r, i))
            * (B.header.shape.length === 1 ? B.slice(i) : B.slice(i, c))

    }

    static matrixProduct(A, B) {
        const sd = B.header.shape[0] // shared dimension
        const od = B.header.shape[1] || 1 // outer or final dimension

        return function (_, i) {
            const [r, c] = [Math.floor(i / od), i % od]
            return LinearAlgebraUtils.dotProduct(sd - 1, r, c, A, B)
        }
    }

    static matrixSize(A, B) {
        return TensorOperator.multiply(A.header.shape.concat(B.header.shape))
            / ScalarOperator.square(B.header.shape[0])
    }

    static matrixShape(A, B) {
        if (A.header.shape.length === 1) return B.header.shape.slice(1)
        if (B.header.shape.length === 1) return A.header.shape.slice(0, 1)

        return [A.header.shape[0], B.header.shape[1]]
    }
}