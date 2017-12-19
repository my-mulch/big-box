
function* matMult(A, B) {
    for (let i = 0; i < A.shape[0]; i++)
        for (let j = 0; j < B.shape[1]; j++)
            yield A.slice(i).dot(B.slice(-1, j))
}

module.exports = {
    matMult
}
