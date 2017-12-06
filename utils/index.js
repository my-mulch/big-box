const matmat = require('mat-mat')

function updateHeader(oldHeader, attrs) {
    return { ...oldHeader, ...attrs }
}

function createHeaderFromArray(A) {
    const header = {}
    header.shape = getShape(A)
    header.bases = getBases(header.shape)
    header.numElements = matmat.prod(header.shape)
    header.array = createTypedArray(A, Float64Array, header)

    return header
}

function trim(shape, index) {
    
}

function subShape(shape, index) {
    return shape.reduce(function (acc, si, i) {
        if (index[i] === -1 || !index[i])
            acc.push(si)
        return acc
    }, [])
}

function subBases(bases, index) {

}

function getShape(A, size = []) {
    if (!A.length) return size

    return getShape(A[0], size.concat(A.length))
}


function getBases(shape) {
    return shape.reduceRight(function (acc, _, i) {
        if (i === shape.length - 1) acc.unshift(1)
        else acc.unshift(acc[0] * shape[i + 1])
        return acc
    }, [])
}

function createTypedArray(A, TypedArray, header) {
    const flattenedTypedArray = new TypedArray(header.numElements)
    const traversal = traverse(A)

    for (let i = 0; i < header.numElements; i++)
        flattenedTypedArray[i] = traversal.next().value

    return flattenedTypedArray
}

function* traverse(A) {
    for (let i = 0; i < A.length; i++)
        if (Array.isArray(A[i]))
            yield* traverse(A[i])
        // This method yields the value at index of an arbitrary shape
        // Helpful because we dont need to pass in the array(s) we are copying to.
        else yield A[i]
}

function findLocalIndex(index, bases) {
    return index.reduce(function (acc, value, dim) {
        return acc + bases[dim] * value
    }, 0)
}


module.exports = {
    getShape,
    getBases,
    createTypedArray,
    traverse,
    findLocalIndex,
    updateHeader,
    subShape,
    createHeaderFromArray
} 
