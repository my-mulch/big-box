const rawArrayUtils = require('./raw')
const ndimArrayUtils = require('./ndim')

function getShape(A) {
    return A instanceof Array
        ? rawArrayUtils.getShape(A)
        : A.header.shape
}

function valueAt(A, index) {
    if (!A) return null

    return A instanceof Array
        ? rawArrayUtils.slice(A, index)
        : A.slice(...index)
}

function* getPossibleIndices(shape, index = []) {
    for (let i = 0; i < shape[0]; i++)
        shape.length > 1
            ? yield* getPossibleIndices(shape.slice(1), index.concat(i))
            : yield index.concat(i)
}

function* elementwiseTraverse(action, A, B) {
    // arrays must have same shape
    for (let index of getPossibleIndices(getShape(A)))
        // reduction begins with null to protect case of single array
        yield action(valueAt(A, index), valueAt(B, index))
}

module.exports = {
    ...rawArrayUtils,
    ...ndimArrayUtils,
    elementwiseTraverse,
    getShape
}
