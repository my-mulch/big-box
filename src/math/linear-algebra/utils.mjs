
export default class LinearAlgebraUtils {

    static matrixSize(A, B) {
        return A.header.size * B.header.size / B.header.shape[0]
    }

    static matrixShape(A, B) {
        if (A.header.shape.length === 1) return B.header.shape.slice(1)
        if (B.header.shape.length === 1) return A.header.shape.slice(0, 1)

        return [A.header.shape[0], B.header.shape[1]]
    }
}
