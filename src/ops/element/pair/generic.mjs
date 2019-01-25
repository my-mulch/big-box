export default function (args) {
    const source = [], aIndex = [], bIndex = []

    source.push(`let ri = 0`)
    for (let i = 0; i < args.A.header.shape.length; i++) {
        source.push(`for(let i${i} = 0; i${i} < args.A.header.shape[${i}]; i${i}++){`)
        aIndex.push(`i${i} * args.A.header.strides[${i}]`)
        bIndex.push(`i${i} * args.B.header.strides[${i}]`)
    }

    source.push(`args.result.data[ri++] = args.reducer(args.A.data[args.A.header.offset + ${aIndex.join('+')}], 
                        args.B.data[args.B.header.offset + ${bIndex.join('+')}])`)

    source.push('}'.repeat(args.A.header.shape.length))
    source.push(`return args.result`)

    return new Function('args', source.join('\n'))
}