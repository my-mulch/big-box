
export function wrapperString(wrap, meat) {
    return wrap.split('$').join(meat)
}

export function helperToString(header, index = []) {
    const elements = []
    const entirety = []

    for (let i = 0; i < header.shape[0]; i++) {
        if (header.shape.length === 1) {
            const localIndex = findLocalIndex(index.concat(i), header)
            elements.push(header.array[localIndex])
        } else {
            const newHeader = { ...header, shape: header.shape.slice(1) }
            const subArrStr = helperToString(newHeader, index.concat(i))
            entirety.push(subArrStr)
        }

        if (i + 1 === header.shape[0] && entirety.length) {
            const newLines = '\n'.repeat(header.shape.length - 1)
            return wrapperString('[$]', entirety.join(',' + newLines + '\t'))
        }
    }

    if (elements.length) return wrapperString('[$]', elements.join(', '))
}


export function getSlice(index, header) {
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


export function getStride(shape) {
    return shape.reduceRight(function (stride, dim) {
        return [dim * stride[0]].concat(stride)
    }, [1]).slice(1)
}


