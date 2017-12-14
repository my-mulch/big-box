
const rawArrayUtils = require('./raw')
const ndimArrayUtils = require('./ndim')

function getShape(A) {
    if (A instanceof MultiDimArray) return A.header.shape
    if (A instanceof Array) return rawArrayUtils.getShape(A)
}

function access(index, action) {
    return function (acc, A) {
        if (A instanceof MultiDimArray) A = A.slice(...index)
        if (A instanceof Array) A = rawArrayUtils.slice(index)

        return action(acc, A)
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
        yield arrays.reduce(access(index, action))
}

function flatten(A) {
    const flat = []
    for (let value of traverse(ops.noop, A))
        flat.push(value)

    return A
}

module.exports = {
    raw: rawArrayUtils,
    ndim: ndimArrayUtils,
    traverse,
    flatten
}
