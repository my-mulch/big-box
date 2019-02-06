
export const shape = function getShape(A, shape = []) {
    if (A.constructor === Number) return shape
    if (A.constructor !== Array) return shape.concat(A.header.shape)

    return getShape(A[0], shape.concat(A.length))
}

export const getFullySpecifiedIndex = function getFullySpecifiedIndex(indices) {
    let index = this.header.offset

    for (let i = 0; i < indices.length; i++)
        index += indices[i] * this.header.strides[i]

    return index
}

export const stringify = function stringify(index, dim = 0) {
    if (dim === this.header.shape.length)
        return this.data[index]

    const level = this.header.shape.length - 1 - dim

    return '[' +
        new Array(this.header.shape[dim])
            .fill(null)
            .map(function (_, i) {
                return stringify.call(this, i * this.header.strides[dim] + index, dim + 1)
            }, this)
            .join(',' + '\n'.repeat(level))
        + ']'

}

export const fill = function (args) {
    if (args.values.constructor === Number)
        args.result.data.fill(args.values)

    else if (args.values.constructor === Function)
        for (let i = 0; i < args.result.data.length; i++)
            args.result.data[i] = args.values()

    else if (args.values.constructor === Array) {
        const flat = args.values.flat(args.result.header.shape.length)

        for (let i = 0; i < flat.length; i++)
            args.result.data[i] = flat[i]
    }

    return args.result
}


