
export default class LinearAlgebraUtils {
    static matrixProduct(A, B) {
        const sd = B.header.shape[0] // shared dimension
        const od = B.header.shape[1] || 1 // outer or final dimension

        return function (_, i) {
            const [row, col] = [Math.floor(i / od), i % od]
            return LinearAlgebraUtils.dotProduct(sd - 1, row, col, A, B)
        }
    }

    static dotProduct(i, row, col, A, B) {
        if (i < 0) return 0

        return LinearAlgebraUtils.dotProduct(i - 1, row, col, A, B)
            + (A.header.shape.length === 1 ? A.slice(i) : A.slice(row, i))
            * (B.header.shape.length === 1 ? B.slice(i) : B.slice(i, col))
    }

    static matrixSize(A, B) {
        return A.header.size * B.header.size / B.header.shape[0]
    }

    static matrixShape(A, B) {
        if (A.header.shape.length === 1) return B.header.shape.slice(1)
        if (B.header.shape.length === 1) return A.header.shape.slice(0, 1)

        return [A.header.shape[0], B.header.shape[1]]
    }

    static swapRows(A, r1, r2) {
        const temp = A.slice(r1)
        A.set(r1).to(A.slice(r2))
        A.set(r2).to(temp)
    }

    static seekPivotRow(A, col) {
        for (let row = col; row < A.header.shape[0]; row++)
            if (A.slice(row, col)) // return non zero pivot
                return row
    }
}
