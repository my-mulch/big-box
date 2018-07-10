const rawArrayUtils = require('./raw')
const ndimArrayUtils = require('./ndim')
const typedArrayUtils = require('./typed')

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



function* elementwiseTraverse(action, A, B) {
    // arrays must have same shape
    for (let index of getPossibleIndices(getShape(A)))
        // reduction begins with null to protect case of single array
        yield action(valueAt(A, index), valueAt(B, index))
}

module.exports = {
    ...rawArrayUtils,
    ...ndimArrayUtils,
    ...typedArrayUtils,
    elementwiseTraverse,
    getShape
}
