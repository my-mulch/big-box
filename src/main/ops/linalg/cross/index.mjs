
export default {
    cross: {
        'true': function (args) {
            const ofStrides = args.of.shape[0] === 3 ? args.of.strides[0] : args.of.strides[1]
            const withStrides = args.with.shape[0] === 3 ? args.with.strides[0] : args.with.strides[1]
            const resultStrides = args.result.shape[0] === 3 ? args.result.strides[0] : args.result.strides[1]

            return new Function('args', `
                args.result.data[${args.result.offset + 0 * resultStrides}] =
                    args.of.data[${1 * ofStrides + args.of.offset}] * args.with.data[${2 * withStrides + args.with.offset}] -
                    args.of.data[${2 * ofStrides + args.of.offset}] * args.with.data[${1 * withStrides + args.with.offset}]
        
                args.result.data[${args.result.offset + 1 * resultStrides}] =
                    args.of.data[${2 * ofStrides + args.of.offset}] * args.with.data[${0 * withStrides + args.with.offset}] -
                    args.of.data[${0 * ofStrides + args.of.offset}] * args.with.data[${2 * withStrides + args.with.offset}]
        
                args.result.data[${args.result.offset + 2 * resultStrides}] =
                    args.of.data[${0 * ofStrides + args.of.offset}] * args.with.data[${1 * withStrides + args.with.offset}] -
                    args.of.data[${1 * ofStrides + args.of.offset}] * args.with.data[${0 * withStrides + args.with.offset}]
        
                return args.result
            `)
        }
    }
}
