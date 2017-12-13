
function getStride(shape) {
    return shape.reduceRight(function (acc, _, i) {
        if (i === shape.length - 1) acc.unshift(1)
        else acc.unshift(acc[0] * shape[i + 1])
        return acc
    }, [])
}

function getSlice(index, header) {
    return [
        header.shape.filter(specifiedDimensions(index)),
        header.stride.filter(specifiedDimensions(index))
    ]
}

function findLocalIndex(index, header) {
    return header.offset + index.reduce(function (acc, value, dim) {
        if (value === -1) return acc
        return acc + header.stride[dim] * value
    }, 0)
}

function isFullySpecified(index, shape) {
    return index.length === shape.length && index.every(function (element) {
        return element >= 0
    })
}

function specifiedDimensions(index) {
    return function filter(element, i) {
        return index[i] === undefined || index[i] === -1
    }
}

function wrapperString(wrap, meat) {
    return wrap.split('$').join(meat)
}

function helperToString(header, index = []) {
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

function dotShape(A, B) {
    return [A.header.shape[0], B.header.shape[1]]
}


module.exports = {
    getStride,
    getSlice,
    dotShape,
    findLocalIndex,
    isFullySpecified,
    helperToString,
    wrapperString,
    elementwise
} 
