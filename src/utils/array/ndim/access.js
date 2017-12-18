function specifiedDimensions(index) {
    return function filter(element, i) {
        return index[i] === undefined || index[i] === -1
    }
}

function indexIsFullySpecified(index, header) {
    const fullLength = index.length === header.shape.length
    
    return fullLength && index.every(function (element) {
        return element >= 0
    })
}

function findLocalIndex(index, header) {
    return header.offset + index.reduce(function (acc, value, dim) {
        if (value === -1) return acc
        return acc + header.stride[dim] * value
    }, 0)
}

function getSlice(index, header) {
    return [
        header.shape.filter(specifiedDimensions(index)),
        header.stride.filter(specifiedDimensions(index))
    ]
}

function getStride(header) {
    return header.shape.reduceRight(function (acc, _, i) {
        if (i === header.shape.length - 1) acc.unshift(1)
        else acc.unshift(acc[0] * header.shape[i + 1])
        return acc
    }, [])
}

module.exports = {
    getStride,
    getSlice,
    findLocalIndex,
    indexIsFullySpecified,
}