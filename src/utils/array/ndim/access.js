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

function getStride(shape) {
    return shape.reduceRight(function (stride, dim) {
        return [dim * stride[0]].concat(stride)
    }, [1])
        .slice(1)
}

module.exports = {
    getStride,
    getSlice,
    findLocalIndex,
    indexIsFullySpecified,
}