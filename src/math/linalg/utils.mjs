import TensorOperator from '../tensor'

export default class LinearAlgebraUtils {
    static dotProduct(r, c, A, B) {
        return function (result, _, s) {
            return result
                + (A.header.shape.length === 1 ? A.slice(s) : A.slice(r, s))
                * (B.header.shape.length === 1 ? B.slice(s) : B.slice(s, c))
        }
    }

    static matrixProduct(A, B) {
        const sd = B.header.shape[0] // shared dimension
        const od = B.header.shape.slice(-1).pop() // outer or final dimension

        return function (_, i) {
            const [r, c] = [Math.floor(i / od), i % od]
            return new Array(sd).reduce(dotProduct(r, c, A, B), 0)
        }
    }

    static matrixSize(A, B) {
        return TensorOperator.multiply(
            A.header.shape.concat(B.header.shape)) / ScalarOperator.square(B.header.shape[0])
    }

    static matrixShape(A, B) {
        return [A.header.shape[0], B.header.shape[1]]
    }
}