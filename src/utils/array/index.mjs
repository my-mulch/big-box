function valueAt(A, index) {
    if (!A) return null

    return A instanceof Array ?
        rawArrayUtils.slice(A, index) :
        A.slice(...index)
}



function* elementwiseTraverse(action, A, B) {
    // arrays must have same shape
    for (let index of getPossibleIndices(getShape(A)))
        // reduction begins with null to protect case of single array
        yield action(valueAt(A, index), valueAt(B, index))
}