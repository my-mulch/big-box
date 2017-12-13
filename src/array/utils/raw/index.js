
function traverse(A, action) {
    for (let i = 0; i < A.length; i++)
        if (Array.isArray(A[i])) traverse(A[i], action)
        else action(A[i])
}

function flatten(A) {
    const flat = []
    // I figured flatten should be flat ;)
    traverse(A, function (element) { flat.push(element) })
    return flat
}

function getShape(A, size = []) {
    if (!A.length) return size

    return getShape(A[0], size.concat(A.length))
}

module.exports = {
    traverse,
    flatten,
    getShape
}
