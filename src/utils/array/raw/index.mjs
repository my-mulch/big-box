export function getShape(A, shape = []) {
    if (!A.length) return shape

    return getShape(A[0], shape.concat(A.length))
}

export function* getIndices(shape, index = []) {
    for (let i = 0; i < shape[0]; i++)
        if (shape.length > 1)
            yield* getIndices(shape.slice(1), index.concat(i))
    else
        yield index.concat(i)
}

export function* flatten(A) {
    for (let i = 0; i < A.length; i++)
        if (Array.isArray(A[i]))
            yield* flatten(A[i])
    else
        yield A[i]
}

export function slice(A, index) {
    if (!index.length) return A

    return slice(A[index[0]], index.slice(1))
}

export function create(shape) {
    if (!shape.length) return 0

    return new Array(shape[0]).fill(null).map(function () {
        return create(shape.slice(1))
    })
}

export function cycle(array, n) {
    const copy = [...array]
    return copy.splice(-n % copy.length).concat(copy)
}

export function insert(A, index, value) {
    if (index.length === 1) {
        A[index[0]] = value
        return
    }

    insert(A[index[0]], index.slice(1), value)
}