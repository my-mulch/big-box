export default function (args) {
    const rIndex = [], rLoops = [], aIndex = [], aLoops = [],
        rl = args.axes[1].length, al = args.axes[0].length

    for (let i = 0; i < rl; i++) {
        rLoops.push(`for(let r${i} = 0; r${i} < args.of.header.shape[args.axes[1][${i}]]; r${i}++){`)
        aIndex.push(`r${i} * args.of.header.strides[args.axes[1][${i}]]`)
        rIndex.push(`r${i} * args.result.header.strides[${i}]`)
    }

    for (let i = 0; i < al; i++) {
        aLoops.push(`for(let a${i} = 0; a${i} < args.of.header.shape[args.axes[0][${i}]]; a${i}++){`)
        aIndex.push(`a${i} * args.of.header.strides[args.axes[0][${i}]]`)
    }


    return new Function('args', [
        `let ri = 0, ai = 0, ii = 0`,
        ...rLoops,
        'ii = 0',
        ...aLoops,
        `ai = args.of.header.offset + ${aIndex.join('+') || 0}`,
        `ri = args.result.header.offset + ${rIndex.join('+') || 0}`,
        `if(!ii) { args.result.data[ri] = args.of.data[ai] } ii++`,
        `args.result.data[ri] = args.reducer(args.mapper(args.of.data[ai]), args.result.data[ri], ii)`,
        '}'.repeat(al),
        '}'.repeat(rl),
        `return args.result`
    ].join('\n'))
}
