
function getShape(A, shape = []) {
    if (!A.length) return shape

    return getShape(A[0], shape.concat(A.length))
}

function* getIndices(shape, index = []) {
    for (let i = 0; i < shape[0]; i++)
        if (shape.length > 1)
            yield* getIndices(shape.slice(1), index.concat(i))
        else
            yield index.concat(i)
}

function* flatten(A) {
    for (let i = 0; i < A.length; i++)
        if (Array.isArray(A[i]))
            yield* flatten(A[i])
        else
            yield A[i]
}

function slice(A, index) {
    if (!index.length) return A

    return slice(A[index[0]], index.slice(1))
}


module.exports = {
    getShape,
    getIndices,
    slice,
    flatten
}
