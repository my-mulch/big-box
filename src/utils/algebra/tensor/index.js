

function elementwiseTensorOperation(fn, arrays) {
    const C = ndim.emptyLike(A)

    for (let [result, idx] of traverse(fn, arrays))
        C.set('=', [result], ...idx)

    return C
}

module.exports = {
    getIndices,
    traverse,
    elementwiseTensorOperation
}
