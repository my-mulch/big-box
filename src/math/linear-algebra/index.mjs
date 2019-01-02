
export default class LinearAlgebraOperator {

    static matMult(A, B, R) {
        for (let r = 0; r < A.header.shape[0]; r++)
            for (let c = 0; c < B.header.shape[1]; c++)
                for (let s = 0; s < A.header.shape[1]; s++)
                    R.data[r * B.header.shape[1] + c] +=
                        A.data[r * A.header.strides[0] + s * A.header.strides[1] + A.header.offset] *
                        B.data[c * B.header.strides[1] + s * B.header.strides[0] + B.header.offset]
        return R
    }


    static cross(A, B, R) {
        R.data[0] = A.data[1 + A.header.offset] * B.data[2 + B.header.offset] - A.data[2 + A.header.offset] * B.data[1 + B.header.offset]
        R.data[1] = A.data[2 + A.header.offset] * B.data[0 + B.header.offset] - A.data[0 + A.header.offset] * B.data[2 + B.header.offset]
        R.data[2] = A.data[0 + A.header.offset] * B.data[1 + B.header.offset] - A.data[1 + A.header.offset] * B.data[0 + B.header.offset]

        return R
    }

    static identity(diagonal, numDiags, R) {
        for (let i = 0; i < numDiags; i += diagonal)
            R.data[i] = 1

        return R
    }


}
