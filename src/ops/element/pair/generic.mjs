export default function (args) {
    const loops = [], aIndex = [], bIndex = [], rIndex = [],
        al = args.of.header.shape.length,
        bl = args.with.header.shape.length

    for (let i = 0; i < al; i++) {
        loops.push(`for(let i${i} = 0; i${i} < args.of.header.shape[${i}]; i${i}++){`)
        aIndex.push(`i${i} * args.of.header.strides[${i}]`)
        rIndex.push(`i${i} * args.result.header.strides[${i}]`)

        if (i >= al - bl)
            bIndex.push(`i${i} * args.with.header.strides[${i}]`)
    }

    return new Function('args', [
        `let ri = 0, ai = 0, bi = 0`,
        ...loops,
        `ai = args.of.header.offset + ${aIndex.join('+') || 0}`,
        `bi = args.with.header.offset + ${bIndex.join('+') || 0}`,
        `ri = args.result.header.offset + ${rIndex.join('+') || 0}`,
        `args.result.data[ri] = args.reducer(args.of.data[ai], args.with.data[bi])`,
        '}'.repeat(al),
        `return args.result`
    ].join('\n'))
}