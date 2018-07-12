/**
 * 
 * 
 * UTILS FOR MULTI-DIM ARRAYS
 * 
 * 
 * 
 */

export function getData(indices, data, header) {
    return data[
        // index returned
        header.offset + indices.reduce(function (finalIndex, idxValue, i) {
            return finalIndex + idxValue * header.stride[i]
        }, 0)
    ]
}

export function getSlice(indices, oldHeader) {
    const newHeader = JSON.parse(JSON.stringify(oldHeader))

    for (let i = 0, del = 0; i < oldHeader.shape.length; i++) {
        if (indices[i] >= 0) {
            newHeader.offset += oldHeader.stride[i] * indices[i]
            newHeader.stride.splice(i - del, 1)
            newHeader.shape.splice(i - del, 1)
            del++
        }
    }

    return newHeader
}

export function getStride(shape) {
    return shape.reduceRight(function (stride, dim) {
        return [dim * stride[0]].concat(stride)
    }, [1]).slice(1)
}

export function getDataForSlice(data, header) {
    return [...getIndices(header.shape)].map(function (index) {
        return getData(index, data, header)
    })
}

/**
 * 
 * 
 * UTILS FOR RAW JAVASCRIPT ARRAYS
 * 
 * 
 * 
 */

export function* getGenerator(A) {
    yield* A
}

export function getShape(A, shape = []) {
    if (!A.length) return shape

    return getShape(A[0], shape.concat(A.length))
}

export function* getIndices(shape, index = []) {
    for (let i = 0; i < shape[0]; i++) {
        if (shape.length > 1)
            yield* getIndices(shape.slice(1), index.concat(i))
        else
            yield index.concat(i)
    }
}

export function* flatten(A) {
    for (let i = 0; i < A.length; i++) {
        if (Array.isArray(A[i])) yield* flatten(A[i])
        else yield A[i]
    }
}

export function getTemplateArrayString(shape) {
    return shape.reduce(function (template, dimension) {
        return template
            .replace(/\$/g, new Array(dimension)
                .fill("[$]")
                .join(","))
    }, "[$]")
}

export function slice(A, index) {
    if (!index.length) return A

    return slice(A[index[0]], index.slice(1))
}

export function create(shape, fill = () => 0) {
    if (!shape.length) return fill()

    return new Array(shape[0]).fill(null).map(function () {
        return create(shape.slice(1), fill)
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