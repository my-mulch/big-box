export default function (args) {
    const source = [], loops = [], index = []

    for (let i = 0; i < args.of.header.shape.length; i++) {
        if (i < args.result.header.shape.length)
            loops.push(`for(let a${i} = 0; a${i} < args.result.header.shape[${i}]; a${i}++){`)
        else
            loops.push(`for(let a${i} = 0; a${i} < args.of.header.shape[args.axes[${i - args.result.header.shape.length}]]; a${i}++){`)

        index.push(`a${i} * args.of.header.strides[${i}]`)
    }

    source.push('let ri = 0')
    source.push(...loops)
    source.push(`args.result.data[ri] = args.reducer(args.mapper(args.of.data[args.of.header.offset + ${index.join('+')}]), args.result.data[ri])`)

    source.push('}'.repeat(args.of.header.shape.length - args.result.header.shape.length))
    source.push('ri++')
    source.push('}'.repeat(args.result.header.shape.length))

    source.push(`return args.result`)

    return new Function('args', source.join('\n'))
}
