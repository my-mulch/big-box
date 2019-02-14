
export default function (args) {
    const rows = args.of.header.shape[0],
        cols = args.with.header.shape[1],
        shared = args.of.header.shape[1]

    return new Function('args', `
        ${new Array(rows * cols).fill(null).map(function (_, i) {
            const [r, c] = [
                Math.floor(i / cols) % rows,
                Math.floor(i / 1) % cols,
            ]
            const ri = args.result.header.offset + r * args.result.header.strides[0] + c * args.result.header.strides[1]

            return `args.result.data[${ri}] = ${new Array(shared).fill(null).map(function (_, s) {
                const oi = r * args.of.header.strides[0] + s * args.of.header.strides[1] + args.of.header.offset
                const wi = c * args.with.header.strides[1] + s * args.with.header.strides[0] + args.with.header.offset

                return `args.of.data[${oi}] * args.with.data[${wi}]`
            }).join('+')}`

        }).join('\n')}
        
        return args.result
    `)
}

