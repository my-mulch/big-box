
const rawArrayUtils = require('./raw')
const ndimArrayUtils = require('./ndim')
const ops = require('../../algebra/ops')

function getShape(A) {
    if (A instanceof require('../../ndarray'))
        return A.header.shape

    if (A instanceof Array)
        return rawArrayUtils.getShape(A)
}

function access(index, action) {
    return function (accumulated, A) {
        if (A instanceof require('../../ndarray'))
            A = A.slice(...index)

        if (A instanceof Array)
            A = rawArrayUtils.slice(A,index)

        return !accumulated ? A : action(accumulated, A)
    }
}

function* getIndices(shape, index = []) {
    for (let i = 0; i < shape[0]; i++)
        if (shape.length > 1)
            yield* traverse(shape.slice(1), index.concat(i))
        else
            yield index.concat(i)
}

function* traverse(action, ...arrays) {
    // arrays must have same shape
    const template = arrays[0]
    const shape = getShape(template)

    for (let index of getIndices(shape)) 
        // reduction begins with null to protect case of single array
        yield [index, arrays.reduce(access(index, action), null)]
    
}

function flatten(A) {
    const flat = []
    for (let [_, value] of traverse(ops.noop, A))
        flat.push(value)

    return flat
}

module.exports = {
    ...rawArrayUtils,
    ...ndimArrayUtils,
    traverse,
    flatten
}
