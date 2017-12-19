
function concat(A, B, type) {
    const C = new type(A.length + B.length)

    C.set(A)
    C.set(B, A.length)

    return C
}

module.exports = {
    concat
}
