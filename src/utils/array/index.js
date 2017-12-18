const rawArrayUtils = require('./raw')
const ndimArrayUtils = require('./ndim')
const ops = require('../../algebra/ops')

function getShape(A) {
    return A instanceof Array
        ? rawArrayUtils.getShape(A)
        : A.header.shape
}

function access(index, action) {
    return function (accumulated, A) {

        const valueAtIndex = A instanceof Array
            ? rawArrayUtils.slice(A, index)
            : A.slice(...index)

        return !accumulated ? valueAtIndex : action(accumulated, valueAtIndex)
    }
}

function* getPossibleIndices(shape, index = []) {
    for (let i = 0; i < shape[0]; i++)
        shape.length > 1
            ? yield* getPossibleIndices(shape.slice(1), index.concat(i))
            : yield index.concat(i)
}

function* traverse(action, arrays) {
    // arrays must have same shape
    const template = arrays[0]
    const shape = getShape(template)

    for (let index of getPossibleIndices(shape))
        // reduction begins with null to protect case of single array
        yield arrays.reduce(access(index, action), null)

}

function flatten(A) {
    return [...traverse(ops.noop, [A])]
}

module.exports = {
    ...rawArrayUtils,
    ...ndimArrayUtils,
    traverse,
    flatten,
    getShape
}
