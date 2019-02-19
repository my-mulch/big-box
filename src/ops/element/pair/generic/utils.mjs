export const loops = function (count) {
    return new Array(count).fill(null).map(function (_, i) {
        return `for(let i${i} = 0; i${i} < args.of.header.shape[${i}]; i${i}++){`
    }).join('\n')
}

export const aIndex = function (al) {
    return 'const ai = args.of.header.offset ' + new Array(al)
        .fill(null)
        .map(function (_, i) { return `i${i} * args.of.header.strides[${i}]` })
        .join('+') || 0
}

export const bIndex = function (al, bl) {
    return 'const bi = args.with.header.offset ' + new Array(bl)
        .fill(null)
        .map(function (_, i) { return `i${(al - bl) + i} * args.with.header.strides[${i}]` })
        .join('+') || 0
}

export const rIndex = function (rl) {
    return 'const ri = args.result.header.offset ' + new Array(rl)
        .fill(null)
        .map(function (_, i) { return `i${i} * args.result.header.strides[${i}]` })
        .join('+') || 0
}
