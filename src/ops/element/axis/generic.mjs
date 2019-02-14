export default function (args) {
    const rl = args.axes[1].length, al = args.axes[0].length

    return new Function('args', `
        ${new Array(rl).fill(null).map(function (_, i) {
            return `for(let r${i} = 0; r${i} < args.of.header.shape[args.axes[1][${i}]]; r${i}++){`
        }).join('\n')}

        let ii = 0

        ${new Array(al).fill(null).map(function (_, i) {
            return `for (let a${i} = 0; a${i} < args.of.header.shape[args.axes[0][${i}]]; a${i} ++) {`
        }).join('\n')}

        const ai = args.of.header.offset + ${new Array(al + rl).fill(null).map(function (_, i) {
            if (i < rl)
                return `r${i} * args.of.header.strides[args.axes[1][${i}]]`
            else
                return `a${i - rl} * args.of.header.strides[args.axes[0][${i - rl}]]`
        }).join('+') || 0}

        const ri = args.result.header.offset + ${new Array(rl).fill(null).map(function (_, i) {
            return `r${i} * args.result.header.strides[${i}]`
        }).join('+') || 0}

        if (!ii)
            args.result.data[ri] = args.of.data[ai] 
        
        args.result.data[ri] = args.reducer(args.mapper(args.of.data[ai]), args.result.data[ri], ii++)
        
        ${'}'.repeat(al)}${'}'.repeat(rl)}

        return args.result
    `)
}
