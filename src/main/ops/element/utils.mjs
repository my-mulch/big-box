import { AXIS_INNER_CHARACTER } from '../../../../contants'

export const split = function (axes) {
    const raxes = [], iaxes = [], aaxes = [...axes.keys()]

    for (let i = 0; i < axes.length; i++)
        axes[i] === AXIS_INNER_CHARACTER ? iaxes.push(i) : raxes.push(i)

    return [raxes, iaxes, aaxes]
}

export const flatindex = function (axes, array, initial, index) {
    let resultindex = initial + array.header.offset

    for (const axis of axes) {
        const base = array.header.shape[axis]
        const place = array.header.strides[axis]
        const digit = Math.floor(index / place) % base

        resultindex += digit * place
    }

    return resultindex
}

export const toflatindex = function ([axes, array, initial]) {
    return flatindex(axes, array, initial, i)
}

export const litassign = function (options) {
    const assignments = new Array(options.size)

    for (let i = 0; i < assignments.length; i++)
        assignments[i] = options.assignment(...options.indices.map(toflatindex))

    return assignments
}


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

export const symindex = function (axes, array, offset) {
    return `args.${array}.header.offset + ${axes.map(index(array)).join(' + ')}`
}

export const symloops = function (axes, array, body) {
    return `${axes.map(loop(array)).join('\n')} 
                ${body} 
            ${'}'.repeat(axes.length)}`
}



