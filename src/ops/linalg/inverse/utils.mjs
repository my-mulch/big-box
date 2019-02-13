
export const cofactorHelper = function cofactorHelper(of) {
    const size = Math.round(Math.sqrt(of.length))
    const offset = args.of.header.offset

    if (size === 1)
        return `args.of.data[${offset +
            Math.floor(of[0] / args.of.header.shape[0]) * args.of.header.strides[0] +
            of[0] % args.of.header.shape[0] * args.of.header.strides[1]}
        ]`

    if (size === 2)
        return `args.of.data[${offset +
            Math.floor(of[0] / args.of.header.shape[0]) * args.of.header.strides[0] +
            of[0] % args.of.header.shape[0] * args.of.header.strides[1]}
        ] * args.of.data[${offset +
            Math.floor(of[3] / args.of.header.shape[0]) * args.of.header.strides[0] +
            of[3] % args.of.header.shape[0] * args.of.header.strides[1]}
        ] - args.of.data[${offset +
            Math.floor(of[2] / args.of.header.shape[0]) * args.of.header.strides[0] +
            of[2] % args.of.header.shape[0] * args.of.header.strides[1]}
        ] * args.of.data[
            offset +
            Math.floor(${of[1]} / ${args.of.header.shape[0]}) * args.of.header.strides[0] +
            ${of[1]} % ${args.of.header.shape[0]} * args.of.header.strides[1]
        ]`

    const cofactors = []
    for (let i = 0; i < size; i++) {

        const lead = `args.of.data[
            offset +
            Math.floor(${of[i]} / ${args.of.header.shape[0]}) * args.of.header.strides[0] +
            ${of[i]} % ${args.of.header.shape[0]} * args.of.header.strides[1]
        ]`

        const sign = Math.pow(-1, i % 2)
        const cofactor = cofactorHelper(survivors(of, 0, i))

        cofactors.push(`${sign} * ${lead} * (${cofactor})`)
    }

    return cofactors.join(' + ')
}

export const survivors = function (of, r, c) {
    const size = Math.round(Math.sqrt(of.length))

    return of.filter(function (_, index) {
        if (index % size === c) return false // in column
        if (Math.floor(index / size) === r) return false // in row

        return true
    })
}
