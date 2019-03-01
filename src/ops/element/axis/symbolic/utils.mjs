
export const loop = function (array) {
    return function (i, j) {
        return `for(let a${i} = 0; a${i} < args.${array}.header.shape[${i}]; a${i}++){`
    }
}

export const index = function (array) {
    return function (i, j) {
        return `a${i} * args.${array}.header.strides[${j}]`
    }
}

export const symindex = function (axes, array) {
    return `args.${array}.header.offset + ${axes.map(index(array)).join(' + ')}`
}

export const symloops = function (axes, array, body) {
    return `${axes.map(loop(array)).join('\n')} 
                ${body} 
            ${'}'.repeat(axes.length)}`
}
