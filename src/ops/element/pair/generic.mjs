export default function (args) {
    const source = [], aIndex = [], bIndex = []

    source.push(`let ri = 0`)
    for (let i = 0; i < args.of.header.shape.length; i++) {
        source.push(`for(let i${i} = 0; i${i} < args.of.header.shape[${i}]; i${i}++){`)
        aIndex.push(`i${i} * args.of.header.strides[${i}]`)
        bIndex.push(`i${i} * args.with.header.strides[${i}]`)
    }

    source.push(`args.result.data[ri++] = args.reducer(
        args.of.data[args.of.header.offset + ${aIndex.join('+')}], 
        args.with.data[args.with.header.offset + ${bIndex.join('+')}],
        [${'a'.repeat(args.of.header.shape.length).split('').map(function (a, i) { return a + i }).join(',')}]
    )`)

    source.push('}'.repeat(args.of.header.shape.length))
    source.push(`return args.result`)

    return new Function('args', source.join('\n'))
}