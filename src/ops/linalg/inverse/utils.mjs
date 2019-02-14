
export const cofactorHelper = function cofactorHelper(A) {
    const size = Math.round(Math.sqrt(A.length))

    if (size === 1)
        return `args.of.data[${indexify.call(this, A[0])}]`

    if (size === 2)
        return `args.of.data[${indexify.call(this, A[0])}] * args.of.data[${indexify.call(this, A[3])}] - args.of.data[${indexify.call(this, A[2])}] * args.of.data[${indexify.call(this, A[1])}]`

    const cofactors = []
    for (let i = 0; i < size; i++) {

        const sign = Math.pow(-1, i % 2)
        const lead = `args.of.data[${indexify.call(this, A[i])}]`
        const cofactor = cofactorHelper.call(this, survivors(A, 0, i))

        cofactors.push(`${sign} * ${lead} * (${cofactor})`)
    }

    return cofactors.join(' + ')
}

const indexify = function (index) {
    return this.of.header.offset
        + Math.floor(index / this.of.header.shape[0]) * this.of.header.strides[0] +
        index % this.of.header.shape[0] * this.of.header.strides[1]
}

export const survivors = function (A, r, c) {
    const size = Math.round(Math.sqrt(A.length))

    return A.filter(function (_, index) {
        if (index % size === c) return false // in column
        if (Math.floor(index / size) === r) return false // in row

        return true
    })
}
