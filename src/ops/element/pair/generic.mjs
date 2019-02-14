export default function (args) {
    const al = args.of.header.shape.length,
        bl = args.with.header.shape.length,
        rl = args.result.header.shape.length

    return new Function('args', [
        ...new Array(al).fill(null).map(function (_, i) {
            return `for(let i${i} = 0; i${i} < args.of.header.shape[${i}]; i${i}++){`
        }),

        `const ai = args.of.header.offset + ${new Array(al).fill(null).map(function (_, i) {
            return `i${i} * args.of.header.strides[${i}]`
        }).join('+') || 0}`,

        `const bi = args.with.header.offset + ${new Array(bl).fill(null).map(function (_, i) {
            return `i${(al - bl) + i} * args.with.header.strides[${i}]`
        }).join('+') || 0}`,

        `const ri = args.result.header.offset + ${new Array(rl).fill(null).map(function (_, i) {
            return `i${i} * args.result.header.strides[${i}]`
        }).join('+') || 0}`,

        `args.result.data[ri] = args.reducer(args.of.data[ai], args.with.data[bi])`,

        '}'.repeat(al),
        `return args.result`
    ].join('\n'))
}