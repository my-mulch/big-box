import { add, min } from '../element'

import inverse from './inverse'
import matMult from './matmult'

/** --------------------- SINGLES --------------------- */

export const crossProduct = function (args) {
    args.result.data[0] = args.A.data[1 * args.A.header.strides[0] + args.A.header.offset]
        * args.B.data[2 * args.B.header.strides + args.B.header.offset]
        - args.A.data[2 * args.A.header.strides[0] + args.A.header.offset]
        * args.B.data[1 * args.B.header.strides + args.B.header.offset]

    args.result.data[1] = args.A.data[2 * args.A.header.strides[0] + args.A.header.offset]
        * args.B.data[0 * args.B.header.strides + args.B.header.offset]
        - args.A.data[0 * args.A.header.strides[0] + args.A.header.offset]
        * args.B.data[2 * args.B.header.strides + args.B.header.offset]

    args.result.data[2] = args.A.data[0 * args.A.header.strides[0] + args.A.header.offset]
        * args.B.data[1 * args.B.header.strides + args.B.header.offset]
        - args.A.data[1 * args.A.header.strides[0] + args.A.header.offset]
        * args.B.data[0 * args.B.header.strides + args.B.header.offset]

    return args.result
}

export const identity = function (args) {
    const diagonal = args.result.header.strides.reduce(add)
    const numDiags = args.result.header.shape.reduce(min)

    for (let i = 0; i < numDiags * diagonal; i += diagonal)
        args.result.data[i] = 1

    return args.result
}

/** --------------------- SUITES --------------------- */

export const invSuite = inverse
export const matMultSuite = matMult
