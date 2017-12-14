const { ndim } = require('../../array/utils')
const ops = require('../ops')

function* getIndices(shape, index = []) {
    for (let i = 0; i < shape[0]; i++)
        if (shape.length > 1)
            yield* traverse(shape.slice(1), index.concat(i))
        else
            yield index.concat(i)
}

function* traverse(op, arrays) {
    // arrays must have same shape
    const commonShape = arrays[0].header.shape

    for (let idx of getIndices(commonShape))
        yield arrays.reduce(ndim.slice).reduce(op)

}

function elementwiseTensorOperation(fn, arrays) {
    const C = ndim.emptyLike(A)

    for (let [result, idx] of traverse(fn, arrays))
        C.set('=', [result], ...idx)

    return C
}

function add(...arrays) {
    return elementwiseTensorOperation(ops.add, arrays)
}

function subtract(...arrays) {
    return elementwiseTensorOperation(ops.sub, arrays)
}

function multiply(...arrays) {
    return elementwiseTensorOperation(ops.mult, arrays)
}

function divide(...arrays) {
    return elementwiseTensorOperation(ops.div, arrays)
}

module.exports = {
    add,
    subtract,
    multiply,
    divide
}
