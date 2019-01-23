
export const arrShape = function arrShape(A, shape = []) {
    if (A.constructor === Number) return shape
    if (A.constructor !== Array) return shape.concat(A.header.shape)

    return arrShape(A[0], shape.concat(A.length))
}

export const arrIndices = function (array) {
    const indices = new Array(array.length)

    for (let i = 0; i < indices.length; i++)
        indices[i] = i

    return indices
}

export const stringify = function (array, index = 0, dim = 0) {
    if (dim === array.header.shape.length)
        return array.data[index]

    const level = array.header.shape.length - 1 - dim

    return '[' + new Array(array.header.shape[dim])
        .fill(null)
        .map(function (_, i) {
            const location = i * array.header.strides[dim] + index
            const nest = stringify(array, location, dim + 1)

            return `${nest}`
        })
        .join(',' + '\n'.repeat(level)) + ']'

}


