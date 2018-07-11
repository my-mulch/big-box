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