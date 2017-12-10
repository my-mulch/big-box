const matmat = require('mat-mat')

function createHeader(A) {
    const header = {}

    header.shape = getShape(A)
    header.stride = getStride(header.shape)
    header.numElements = matmat.prod(header.shape)
    header.array = copyTyped(A, Float64Array, header)
    header.offset = 0

    return header
}

function getShape(A, size = []) {
    if (!A.length) return size

    return getShape(A[0], size.concat(A.length))
}


function getStride(shape) {
    return shape.reduceRight(function (acc, _, i) {
        if (i === shape.length - 1) acc.unshift(1)
        else acc.unshift(acc[0] * shape[i + 1])
        return acc
    }, [])
}

function getSlice(index, shape) {
    return shape.filter(function (element, i) {
        return index[i] === undefined || index[i] === -1
    })
}

function copyTyped(A, TypedArray, header) {
    const buffer = new TypedArray(header.numElements)

    traverse(A, function (elem, i) {
        buffer[i] = elem
    })

    return buffer
}

function traverse(A, action) {
    for (let i = 0; i < A.length; i++)
        if (Array.isArray(A[i]))
            traverse(A[i], action)
        // Depth first recursion to hit each element
        else action(A[i])
}

function findLocalIndex(index, stride) {
    return index.reduce(function (acc, value, dim) {
        if (value === -1) return acc
        return acc + stride[dim] * value
    }, 0)
}

function isFullySpecified(index) {
    return index.every(function (element) {
        return element >= 0
    })
}


module.exports = {
    getShape,
    getStride,
    getSlice,
    findLocalIndex,
    createHeader,
    isFullySpecified
} 
