
export default class LinearAlgebraOperator {

    static matMult(A, B, result) {
        for (let r = 0; r < A.header.shape[0]; r++)
            for (let c = 0; c < B.header.shape[1]; c++)
                for (let s = 0; s < A.header.shape[1]; s++)
                    /** Bout as fast as we can get without dipping into Strassen  */
                    result[r * B.header.shape[1] + c] +=
                        A.data[r * A.header.strides[0] + s * A.header.strides[1] + A.header.offset] *
                        B.data[c * B.header.strides[1] + s * B.header.strides[0] + B.header.offset]
    }


    static cross(A, B, result) {
        result[0] = A.data[1 + A.header.offset] * B.data[2 + B.header.offset] - A.data[2 + A.header.offset] * B.data[1 + B.header.offset]
        result[1] = A.data[2 + A.header.offset] * B.data[0 + B.header.offset] - A.data[0 + A.header.offset] * B.data[2 + B.header.offset]
        result[2] = A.data[0 + A.header.offset] * B.data[1 + B.header.offset] - A.data[1 + A.header.offset] * B.data[0 + B.header.offset]
    }

    static identity(diagonal, numDiags, result) {
        for (let i = 0; i < numDiags; i += diagonal) result[i] = 1
    }

    static invert(A, I) {
        const size = A.header.shape[0]

        for (let p = 0; p < size; p++) {

            /** If the pivot is smaller than epsilon, go get another one */
            let pivot = A.data[A.offset + p * size + p]
            if (!pivot) {
                swapRows(A, p)
                swapRows(I, p)

                pivot = A.data[A.offset + p * size + p]
            }

            /** Divide pivot row through by pivot */
            for (let r = p; r < size; r++)
                for (let c = 0; c < size; c++)
                    A.data[A.offset + r * A.header.strides[0] + c * A.header.strides[1]] /= pivot

            /** Clear out the elements above and below pivot */
            for (let r = 0; r < size; r++) {
                const knockout = A.data[A.offset + r * A.header.strides[0] + p * A.header.strides[1]]
                for (let c = 0; c < size; c++) {
                    if (r !== p || !knockout) {
                        const ii = I.offset + r * I.header.strides[0] + c * I.header.strides[1]
                        const ai = A.offset + r * A.header.strides[0] + c * A.header.strides[1]

                        I.data[ii] -= knockout * A.data[ai]
                    }
                }
            }

        }
    }

}
