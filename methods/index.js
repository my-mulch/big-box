
function shape(A, size = []) {
    if (!A.length)
        return size

    return shape(A[0], size.concat(A.length))
}

function cycle(A, n) {
    const copy = [...A]
    return copy.splice(-n % copy.length).concat(copy)
}

function seek(A, index) {
    if (!index.length) return A

    // Allows for a slice along dimension -1 is the 
    // secret take all similiar to ':' in python
    if (index[0] === -1) {
        let i = 0, data = []
        while (A[i]) {
            data.push(seek(A[i], index.slice(1)))
            i++
        }
        return data
    }

    return seek(A[index[0]], index.slice(1))
}

function insert(A, index, value) {
    if (!index.length) return

    const i = index[0]
    if (index.length === 1) A[i] = value
    else A[i] = A[i] || []

    insert(A[i], index.slice(1), value)
}

function* indices(A, ind = []) {
    for (let i = 0; i < A.length; i++)
        if (Array.isArray(A[i]))
            yield* traverse(A[i], ind.concat(i))
        // This method yields the indices of a given shape
        // Allows for general elementwise operations
        // on multiple arrays
        else yield ind.concat(i)
}

function transpose(A) {
    const T = arrayLike(shape(A).reverse())
    const indxs = indices(A)

    let i
    while (i = indxs.next().value)
        insert(T, i.reverse(), seek(A, i))

    return T
}


function generalElementwise(A, B, fn) {
    const C = []
    const indxs = indices(A)

    let i
    while (i = indxs.next().value) {
        const ai = seek(A, i)
        const bi = seek(B, i)
        insert(C, i, fn(ai, bi))
    }

    return C
}

function generalReduce(A, fn) {
    const indxs = indices(A)

    let i, res = 0
    while (i = indxs.next().value) {
        res = fn(res, seek(A, i))
    }

    return res
}

function array(shape, fn = () => null) {
    if (!shape.length) return fn()

    const A = new Array(shape[0])
    for (let i = 0; i < shape[0]; i++)
        A[i] = array(shape.slice(1), fn)

    return A
}

function arrayLike(A) {
    return array(shape(A))
}

module.exports = {
    shape,
    cycle,
    seek,
    insert,
    indices,
    transpose,
    array,
    generalReduce,
    generalElementwise,
    arrayLike
}



