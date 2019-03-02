
export const cofactorHelper = function cofactorHelper(A) {
    const size = Math.round(Math.sqrt(A.length))

    if (size === 1)
        return `args.of.data[${indexify.call(this, A[0])}]`

    if (size === 2) {
        const a0 = indexify.call(this, A[0])
        const a1 = indexify.call(this, A[1])
        const a2 = indexify.call(this, A[2])
        const a3 = indexify.call(this, A[3])

        return `args.of.data[${a0}] * args.of.data[${a3}] - args.of.data[${a2}] * args.of.data[${a1}]`
    }

    const cofactors = []
    for (let i = 0; i < size; i++) {

        const sign = Math.pow(-1, i % 2)
        const lead = `args.of.data[${indexify.call(this, A[i])}]`
        const cofactor = cofactorHelper.call(this, survivors(A, 0, i))

        cofactors.push(`${sign} * ${lead} * (${cofactor})`)
    }

    return cofactors.join(' + ')
}

export const indexify = function (r, c) {
    if (c === undefined)
        [r, c] = flatToRC.call(this, r)

    return this.header.offset
        + r * this.header.strides[0]
        + c * this.header.strides[1]
}

const flatToRC = function (index) {
    const s0 = this.header.shape[0], s1 = 1

    return [
        Math.floor(index / s0) % this.header.shape[0],
        Math.floor(index / s1) % this.header.shape[1],
    ]
}

export const survivors = function (A, r, c) {
    const size = Math.round(Math.sqrt(A.length))

    return A.filter(function (_, index) {
        if (index % size === c) return false // in column
        if (Math.floor(index / size) === r) return false // in row

        return true
    })
}
