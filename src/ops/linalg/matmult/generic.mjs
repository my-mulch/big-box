
export default function (args) {
    for (let r = 0; r < args.of.header.shape[0]; r++)
        for (let c = 0; c < args.with.header.shape[1]; c++)
            for (let s = 0; s < args.of.header.shape[1]; s++)
                args.result.data[r * args.with.header.shape[1] + c] +=
                    args.of.data[r * args.of.header.strides[0] + s * args.of.header.strides[1] + args.of.header.offset] *
                    args.with.data[c * args.with.header.strides[1] + s * args.with.header.strides[0] + args.with.header.offset]

    return args.result
}
