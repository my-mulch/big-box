
export const crossProduct = function (args) {
    const ofStrides = args.of.header.shape[0] === 3 ? args.of.header.strides[0] : args.of.header.strides[1]
    const withStrides = args.with.header.shape[0] === 3 ? args.with.header.strides[0] : args.with.header.strides[1]
    const resultStrides = args.result.header.shape[0] === 3 ? args.result.header.strides[0] : args.result.header.strides[1]

    return new Function('args', `
        args.result.data[${args.result.header.offset + 0 * resultStrides}] =
            args.of.data[${1 * ofStrides + args.of.header.offset}] * args.with.data[${2 * withStrides + args.with.header.offset}] -
            args.of.data[${2 * ofStrides + args.of.header.offset}] * args.with.data[${1 * withStrides + args.with.header.offset}]

        args.result.data[${args.result.header.offset + 1 * resultStrides}] =
            args.of.data[${2 * ofStrides + args.of.header.offset}] * args.with.data[${0 * withStrides + args.with.header.offset}] -
            args.of.data[${0 * ofStrides + args.of.header.offset}] * args.with.data[${2 * withStrides + args.with.header.offset}]

        args.result.data[${args.result.header.offset + 2 * resultStrides}] =
            args.of.data[${0 * ofStrides + args.of.header.offset}] * args.with.data[${1 * withStrides + args.with.header.offset}] -
            args.of.data[${1 * ofStrides + args.of.header.offset}] * args.with.data[${0 * withStrides + args.with.header.offset}]

        return args.result
    `)
}
