
export default function (args) {
    const source = []

    for (let r = 0; r < args.A.header.shape[0]; r++) {
        for (let c = 0; c < args.B.header.shape[1]; c++) {
            const mults = []
            for (let s = 0; s < args.A.header.shape[1]; s++) {
                mults.push(`
                args.A.data[${r * args.A.header.strides[0] + s * args.A.header.strides[1]} + args.A.header.offset] * 
                args.B.data[${c * args.B.header.strides[1] + s * args.B.header.strides[0]} + args.B.header.offset]`)
            }
            source.push(`args.R.data[${source.length}]=${mults.join('+')}`)
        }
    }

    source.push('return args.R')
    return new Function('args', source.join('\n'))
}
