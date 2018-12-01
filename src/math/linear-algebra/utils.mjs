
export default class LinearAlgebraUtils {

    static matrixSize(A, B) {
        return A.header.size * B.header.size / B.header.shape[0]
    }

    static matrixShape(A, B) {
        if (A.header.shape.length === 1) return B.header.shape.slice(1)
        if (B.header.shape.length === 1) return A.header.shape.slice(0, 1)

        return [A.header.shape[0], B.header.shape[1]]
    }

    static swapRows(A, p) {
        const size = A.header.shape[0]
        for (let r = p + 1; r < size; r++)
            if (A.data[A.offset + r * A.header.strides[0] + p])
                for (let c = 0; c < size; c++)
                    swap(A.data, A.offset + r * A.header.strides[0] + c * A.header.strides[0])

    }
}
