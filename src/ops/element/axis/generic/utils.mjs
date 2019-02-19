
export const loops = function (axes, type) {
    return Array.from(axes)
        .map(type)
        .filter(function () { return true })
        .join('\n')
}

export const resultLoops = function (axes) {
    return loops(axes, function (axis, i) {
        if (axis === 'o')
            return `for(let a${i} = 0; a${i} < args.of.header.shape[${i}]; a${i}++){`
    })
}

export const innerLoops = function (axes) {
    return loops(axes, function (axis, i) {
        if (axis !== 'o')
            return `for(let a${i} = 0; a${i} < args.of.header.shape[${i}]; a${i}++){`
    })
}

export const resultIndex = function (axes) {
    let strideIndex = 0
    return 'args.result.header.offset ' + Array.from(axes)
        .map(function (axis, i) {
            if (axis === 'o')
                return `a${i} * args.result.header.strides[${strideIndex++}]`
        })
        .filter(function () { return true })
        .join('+') || 0
}


export const innerIndex = function (axes) {
    return 'args.of.header.offset ' + Array.from(axes)
        .map(function (_, i) {
            return `a${i} * args.result.header.strides[${i}]`
        })
        .join('+') || 0
}
