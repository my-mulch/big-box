
export default function (args) {
    for (let r = 0; r < args.A.header.shape[0]; r++)
        for (let c = 0; c < args.B.header.shape[1]; c++)
            for (let s = 0; s < args.A.header.shape[1]; s++)
                args.R.data[r * args.B.header.shape[1] + c] +=
                    args.A.data[r * args.A.header.strides[0] + s * args.A.header.strides[1] + args.A.header.offset] *
                    args.B.data[c * args.B.header.strides[1] + s * args.B.header.strides[0] + args.B.header.offset]

    return args.R
}
