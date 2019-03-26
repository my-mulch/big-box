
export default function () {
    return function (args) {
        for (let r = 0; r < args.of.shape[0]; r++)
            for (let c = 0; c < args.with.shape[1]; c++)
                for (let s = 0; s < args.of.shape[1]; s++)
                    args.result.data[r * args.with.shape[1] + c] +=
                        args.of.data[r * args.of.strides[0] + s * args.of.strides[1] + args.of.offset] *
                        args.with.data[c * args.with.strides[1] + s * args.with.strides[0] + args.with.offset]

        return args.result
    }
}
