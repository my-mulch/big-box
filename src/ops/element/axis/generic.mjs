export default function (args) {
    const source = [], loops = [], index = []

    for (let i = 0; i < args.A.header.shape.length; i++) {
        if (i < args.R.header.shape.length)
            loops.push(`for(let a${i} = 0; a${i} < args.R.header.shape[${i}]; a${i}++){`)
        else
            loops.push(`for(let a${i} = 0; a${i} < args.A.header.shape[args.axes[${i - args.R.header.shape.length}]]; a${i}++){`)

        index.push(`a${i} * args.A.header.strides[${i}]`)
    }

    source.push('let ri = 0')
    source.push(...loops)
    source.push(`args.R.data[ri] = args.reducer(args.mapper(args.A.data[args.A.header.offset + ${index.join('+')}]), args.R.data[ri])`)

    source.push('}'.repeat(args.A.header.shape.length - args.R.header.shape.length))
    source.push('ri++')
    source.push('}'.repeat(args.R.header.shape.length))

    source.push(`return args.R`)

    return new Function('args', source.join('\n'))
}
