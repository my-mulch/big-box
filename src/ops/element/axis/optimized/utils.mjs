
export const weave = function (axes, resultIndex, innerIndex) {
    const resultIndexCopy = resultIndex.slice()
    const innerIndexCopy = innerIndex.slice()

    return axes.map(function (axis) {
        return axis === 'o' ? resultIndexCopy.shift() : innerIndexCopy.shift()
    })
}

export const indexifyFlat = function (index) {
    let resultIndex = this.header.offset

    for (let i = 0; i < index.length; i++)
        resultIndex += this.header.strides[i] * index[i]

    return resultIndex
}

export const indexifyLongWithAxes = function (axes, axis, index) {
    const resultIndex = []

    for (let i = 0; i < axes.length; i++)
        if (axes[i] === axis)
            resultIndex.push(Math.floor(index / this.header.strides[i]) % this.header.shape[i])

    return resultIndex
}

export const innerElements = function (axes, size, resultIndex, array) {
    return new Array(size)
        .fill(null)
        .map(function (_, i) {
            const innerIndex = indexifyLongWithAxes.call(array, axes, 'X', i)
            const fullIndex = weave(axes, resultIndex, innerIndex)
            const ai = indexifyFlat.call(array, fullIndex)

            return `args.of.data[${ai}]`
        })
}