export default function (args) {
    const source = [], index = [], rl = args.axes.result.length, al = args.axes.of.length

    source.push('let ri = 0, ai = 0, init')

    for (let i = 0; i < rl; i++) {
        source.push(`for(let a${i} = 0; a${i} < args.of.header.shape[args.axes.result[${i}]]; a${i}++){`)
        index.push(`a${i} * args.of.header.strides[args.axes.result[${i}]]`)
    }

    source.push('init = true')
    for (let i = rl; i < al + rl; i++) {
        source.push(`for(let a${i} = 0; a${i} < args.of.header.shape[args.axes.of[${i - rl}]]; a${i}++){`)
        index.push(`a${i} * args.of.header.strides[args.axes.of[${i - rl}]]`)
    }



    source.push(`ai = args.of.header.offset + ${index.join('+')}`)

    source.push(`if(init){`)
    source.push(`args.result.data[ri] = args.of.data[ai]`)
    source.push('init = false')
    source.push('}')

    source.push(`args.result.data[ri] = args.reducer(args.mapper(args.of.data[ai]), args.result.data[ri])`)

    source.push('}'.repeat(al))
    source.push('ri++')
    source.push('}'.repeat(rl))

    source.push(`return args.result`)

    return new Function('args', source.join('\n'))
}
