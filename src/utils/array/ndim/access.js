
function getSlice(index, header) {
    const newStride = []
    const newShape = []
    let localIndex = header.offset

    for (let i = 0; i < header.shape.length; i++) {
        if (index[i] === null || index[i] === undefined || index[i] === -1) {
            newStride.push(header.stride[i])
            newShape.push(header.shape[i])
        } else
            localIndex += header.stride[i] * index[i]
    }

    return [newShape, newStride, localIndex]
}


function getStride(shape) {
    return shape.reduceRight(function (stride, dim) {
        return [dim * stride[0]].concat(stride)
    }, [1]).slice(1)
}

module.exports = {
    getStride,
    getSlice
}