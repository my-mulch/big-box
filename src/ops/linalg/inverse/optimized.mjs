
export default function (args) {
    const source = [],
        det = [],
        size = Math.round(Math.sqrt(args.A.data.length)),
        template = [...new Array(args.A.data.length).keys()]

    function cofactorHelper(A) {
        const size = Math.round(Math.sqrt(A.length))

        if (size === 1)
            return `args.A.data[ 
                args.A.header.offset +
                Math.floor(${A[0]} / ${size}) * args.A.header.strides[0] +
                ${A[0]} / ${size} * args.A.header.strides[1]
            ]`

        if (size === 2)
            return `args.A.data[
                args.A.header.offset +
                Math.floor(${A[0]} / ${size}) * args.A.header.strides[0] +
                ${A[0]} / ${size} * args.A.header.strides[1]
            ] * args.A.data[
                args.A.header.offset +
                Math.floor(${A[3]} / ${size}) * args.A.header.strides[0] +
                ${A[3]} / ${size} * args.A.header.strides[1]
            ] - args.A.data[
                args.A.header.offset +
                Math.floor(${A[2]} / ${size}) * args.A.header.strides[0] +
                ${A[2]} / ${size} * args.A.header.strides[1]
            ] * args.A.data[
                args.A.header.offset +
                Math.floor(${A[1]} / ${size}) * args.A.header.strides[0] +
                ${A[1]} / ${size} * args.A.header.strides[1]
            ]`

        const cofactors = []
        for (let i = 0; i < size; i++) {

            const lead = `args.A.data[
                args.A.header.offset +
                Math.floor(${A[i]} / ${size}) * args.A.header.strides[0] +
                ${A[i]} / ${size} * args.A.header.strides[1]
            ]`

            const sign = Math.pow(-1, i % 2)
            const cofactor = cofactorHelper(survivors(A, 0, i, size))

            cofactors.push(`${sign} * ${lead} * (${cofactor})`)
        }

        return cofactors.join(' + ')
    }

    function survivors(A, r, c) {
        const size = Math.round(Math.sqrt(A.length))

        return A.filter(function (_, index) {
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
        det.push(`args.A.data[
            args.A.header.offset +
                Math.floor(${i} / ${size}) * args.A.header.strides[0] +
                ${i} / ${size} * args.A.header.strides[1]
        ] * args.result.data[${i * size}]`)

    source.push(`const det = ${det.join('+')}`)
    source.push('for(let i =0; i < args.A.data.length; i++)')
    source.push(`args.result.data[i] /= det`)
    source.push('return args.result')

    return new Function('args', source.join('\n'))
}

