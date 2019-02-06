export default function (args) {
    const source = [], rIndex = [], aIndex = [], rl = args.axes[1].length, al = args.axes[0].length

    source.push('let ri = 0, ai = 0, ii = 0')

    for (let i = 0; i < rl; i++) {
        source.push(`for(let r${i} = 0; r${i} < args.of.header.shape[args.axes[1][${i}]]; r${i}++){`)
        rIndex.push(`r${i} * args.of.header.strides[args.axes[1][${i}]]`)
    }

    source.push('ii = 0')

    for (let i = 0; i < al; i++) {
        source.push(`for(let a${i} = 0; a${i} < args.of.header.shape[args.axes[0][${i}]]; a${i}++){`)
        aIndex.push(`a${i} * args.of.header.strides[args.axes[0][${i}]]`)
    }

    source.push(
        `ai = args.of.header.offset + ${aIndex.join('+') || 0}`,
        `ri = args.result.header.offset + ${rIndex.join('+') || 0}`,
        `if(!ii) { args.result.data[ri] = args.of.data[ai] } ii++`
    )

    const mdi = `[${'a'.repeat(rl + al).split('').map(function (a, i) { return a + i }).join(',')}]`

    source.push(
        `args.result.data[ri] = args.reducer(args.mapper(args.of.data[ai], ai, ${mdi}), args.result.data[ri], ii)`,
        '}'.repeat(al),
        '}'.repeat(rl),
        `return args.result`
    )

    return new Function('args', source.join('\n'))
}
