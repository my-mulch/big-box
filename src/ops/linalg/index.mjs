import { sum, min } from '../element'

import inverse from './inverse'
import matMult from './matmult'

/** --------------------- SINGLES --------------------- */

export const crossProduct = function ({ A, B, R }) {
    R.data[0] = A.data[1 * A.header.strides[0] + A.header.offset]
        * B.data[2 * B.header.strides + B.header.offset]
        - A.data[2 * A.header.strides[0] + A.header.offset]
        * B.data[1 * B.header.strides + B.header.offset]

    R.data[1] = A.data[2 * A.header.strides[0] + A.header.offset]
        * B.data[0 * B.header.strides + B.header.offset]
        - A.data[0 * A.header.strides[0] + A.header.offset]
        * B.data[2 * B.header.strides + B.header.offset]

    R.data[2] = A.data[0 * A.header.strides[0] + A.header.offset]
        * B.data[1 * B.header.strides + B.header.offset]
        - A.data[1 * A.header.strides[0] + A.header.offset]
        * B.data[0 * B.header.strides + B.header.offset]

    return R
}

export const identity = function ({ R }) {
    const diagonal = R.header.strides.reduce(sum)
    const numDiags = R.header.shape.reduce(min)

    for (let i = 0; i < numDiags; i += diagonal)
        R.data[i] = 1

    return R
}

/** --------------------- SUITES --------------------- */

export const invSuite = inverse
export const matMultSuite = matMult
