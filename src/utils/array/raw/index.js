
function getShape(A, size = []) {
    if (!A.length) return size

    return getShape(A[0], size.concat(A.length))
}

function slice(A, index){
    if(!index.length) return A

    return slice(A[index[0]],index.slice(1))
}

module.exports = {
    getShape,
    slice
}
