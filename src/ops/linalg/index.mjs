import { add, min } from '../element'

import inverse from './inverse'
import matMult from './matmult'

/** --------------------- SINGLES --------------------- */

export const crossProduct = function (args) {
    const ofStrides = args.of.header.shape[0] === 3 ? args.of.header.strides[0] : args.of.header.strides[1]
    const withStrides = args.with.header.shape[0] === 3 ? args.with.header.strides[0] : args.with.header.strides[1]

    args.result.data[0] = args.of.data[1 * ofStrides + args.of.header.offset] * args.with.data[2 * withStrides + args.with.header.offset] - args.of.data[2 * ofStrides + args.of.header.offset] * args.with.data[1 * withStrides + args.with.header.offset]
    args.result.data[1] = args.of.data[2 * ofStrides + args.of.header.offset] * args.with.data[0 * withStrides + args.with.header.offset] - args.of.data[0 * ofStrides + args.of.header.offset] * args.with.data[2 * withStrides + args.with.header.offset]
    args.result.data[2] = args.of.data[0 * ofStrides + args.of.header.offset] * args.with.data[1 * withStrides + args.with.header.offset] - args.of.data[1 * ofStrides + args.of.header.offset] * args.with.data[0 * withStrides + args.with.header.offset]

    return args.result
}

/** --------------------- SUITES --------------------- */

export const invSuite = inverse
export const matMultSuite = matMult
