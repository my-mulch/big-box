
export default function (args) {
    const source = [],
        det = [],
        size = Math.round(Math.sqrt(args.of.data.length)),
        template = [...new Array(args.of.data.length).keys()]

    function cofactorHelper(of) {
        const size = Math.round(Math.sqrt(of.length))

        if (size === 1)
            return `args.of.data[ 
                args.of.header.offset +
                Math.floor(${of[0]} / ${args.of.header.shape[0]}) * args.of.header.strides[0] +
                ${of[0]} % ${args.of.header.shape[0]} * args.of.header.strides[1]
            ]`

        if (size === 2)
            return `args.of.data[
                args.of.header.offset +
                Math.floor(${of[0]} / ${args.of.header.shape[0]}) * args.of.header.strides[0] +
                ${of[0]} % ${args.of.header.shape[0]} * args.of.header.strides[1]
            ] * args.of.data[
                args.of.header.offset +
                Math.floor(${of[3]} / ${args.of.header.shape[0]}) * args.of.header.strides[0] +
                ${of[3]} % ${args.of.header.shape[0]} * args.of.header.strides[1]
            ] - args.of.data[
                args.of.header.offset +
                Math.floor(${of[2]} / ${args.of.header.shape[0]}) * args.of.header.strides[0] +
                ${of[2]} % ${args.of.header.shape[0]} * args.of.header.strides[1]
            ] * args.of.data[
                args.of.header.offset +
                Math.floor(${of[1]} / ${args.of.header.shape[0]}) * args.of.header.strides[0] +
                ${of[1]} % ${args.of.header.shape[0]} * args.of.header.strides[1]
            ]`

        const cofactors = []
        for (let i = 0; i < size; i++) {

            const lead = `args.of.data[
                args.of.header.offset +
                Math.floor(${of[i]} / ${args.of.header.shape[0]}) * args.of.header.strides[0] +
                ${of[i]} % ${args.of.header.shape[0]} * args.of.header.strides[1]
            ]`

            const sign = Math.pow(-1, i % 2)
            const cofactor = cofactorHelper(survivors(of, 0, i, size))

            cofactors.push(`${sign} * ${lead} * (${cofactor})`)
        }

        return cofactors.join(' + ')
    }

    function survivors(of, r, c) {
        const size = Math.round(Math.sqrt(of.length))

        return of.filter(function (_, index) {
            if (index % size === c) return false // in column
            if (Math.floor(index / size) === r) return false // in row

            return true
        })
    }

    for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
            const sign = Math.pow(-1, (r + c) % 2)
            const cofactors = cofactorHelper(survivors(template, c, r))

            source.push(`args.result.data[${r * size + c}] = ${sign} * (${cofactors})`)
        }
    }

    for (let i = 0; i < size; i++)
        det.push(`args.of.data[
            args.of.header.offset +
                Math.floor(${i} / ${args.of.header.shape[0]}) * args.of.header.strides[0] +
                ${i} % ${args.of.header.shape[0]} * args.of.header.strides[1]
        ] * args.result.data[${i * size}]`)

    source.push(`const det = ${det.join('+')}`)
    source.push('for(let i =0; i < args.of.data.length; i++)')
    source.push(`args.result.data[i] /= det`)
    source.push('return args.result')

    return new Function('args', source.join('\n'))
}

