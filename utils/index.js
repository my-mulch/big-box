const matmat = require('mat-mat')

function createHeader(A) {
    const header = {}

    header.shape = getShape(A)
    header.stride = getStride(header.shape)
    header.numElements = matmat.prod(header.shape)
    header.array = copyTyped(A, Float64Array)

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

function copyTyped(A, TypedArray) {
    const buffer = new TypedArray()

    traverse(A, function (elem, i) {
        buffer[i] = elem
    })

    return buffer
}

function traverse(A, action, elementCount = 0) {
    for (let i = 0; i < A.length; i++) {
        if (Array.isArray(A[i]))
            elementCount = traverse(A[i], action, elementCount)
        // Depth first recursion to hit each element
        else action(A[i], elementCount++)
    }
    // Must return elementCount to continue the count
    return elementCount
}

function findLocalIndex(index, stride) {
    return index.reduce(function (acc, value, dim) {
        return acc + stride[dim] * value
    }, 0)
}


module.exports = {
    getShape,
    getStride,
    createTypedArray,
    findLocalIndex,
    createHeaderFromArray
} 
