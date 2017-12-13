const ops = require('../ops')

function* traverse(shape, index = []) {
    for (let i = 0; i < shape[0]; i++)
        if (shape.length > 1)
            yield* traverse(shape.slice(1), index.concat(i))
        else
            yield index.concat(i)
}

function elementwiseTensorOperation(A, B, fn) {
    const C = ndim.arrayLike(A)

    for (let idx of traverse(A.header.shape)) {
        const ai = A.slice(...idx)
        const bi = B.slice(...idx)
        C.set([fn(ai, bi)], ...idx)
    }

    return C
}

function add(A, B) {
    return elementwiseTensorOperation(A, B, ops.add)
}

function subtract(A, B) {
    return elementwiseTensorOperation(A, B, ops.sub)
}

function multiply(A, B) {
    return elementwiseTensorOperation(A, B, ops.mult)
}

function divide(A, B) {
    return elementwiseTensorOperation(A, B, ops.div)
}

