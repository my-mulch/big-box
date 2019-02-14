export default function (args) {
    const rl = args.axes[1].length, al = args.axes[0].length

    return new Function('args', `
        ${ /** Creates the for loops for traversing the resultant axes */
        new Array(rl).fill(null).map(function (_, i) {
            return `for(let r${i} = 0; r${i} < args.of.header.shape[args.axes[1][${i}]]; r${i}++){`
        }).join('\n')}

        let ii = 0

        ${ /** Creates the for loops for traversing the selected axes */
        new Array(al).fill(null).map(function (_, i) {
            return `for (let a${i} = 0; a${i} < args.of.header.shape[args.axes[0][${i}]]; a${i} ++) {`
        }).join('\n')}

        const ai = args.of.header.offset + 
        ${ /** The index for the entire array A (ai) is computed */
        new Array(al + rl).fill(null).map(function (_, i) {
            if (i < rl)
                return `r${i} * args.of.header.strides[args.axes[1][${i}]]`
            else
                return `a${i - rl} * args.of.header.strides[args.axes[0][${i - rl}]]`
        }).join('+') || 0}

        const ri = args.result.header.offset + 
        ${ /** The index for the resultant array R (ri) is computed */
        new Array(rl).fill(null).map(function (_, i) {
            return `r${i} * args.result.header.strides[${i}]`
        }).join('+') || 0}

        if (!ii)
            args.result.data[ri] = args.of.data[ai] 
        
        args.result.data[ri] = args.reducer(args.mapper(args.of.data[ai]), args.result.data[ri], ii++)
        
        ${'}'.repeat(al)}${'}'.repeat(rl)}

        return args.result
    `)
}
