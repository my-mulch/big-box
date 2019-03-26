
export default function (args) {
    const rows = args.of.shape[0],
        cols = args.with.shape[1],
        shared = args.of.shape[1]

    return new Function('args', `
        ${new Array(rows * cols).fill(null).map(function (_, i) {
            const [r, c] = [
                Math.floor(i / cols) % rows,
                Math.floor(i / 1) % cols,
            ]
            const ri = args.result.offset + r * args.result.strides[0] + c * args.result.strides[1]

            return `args.result.data[${ri}] = ${new Array(shared).fill(null).map(function (_, s) {
                const oi = r * args.of.strides[0] + s * args.of.strides[1] + args.of.offset
                const wi = c * args.with.strides[1] + s * args.with.strides[0] + args.with.offset

                return `args.of.data[${oi}] * args.with.data[${wi}]`
            }).join('+')}`

        }).join('\n')}
        
        return args.result
    `)
}

