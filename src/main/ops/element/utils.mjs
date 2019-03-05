import { AXIS_INNER_CHARACTER } from '../../../resources'

export const bylines = function (items) { return items.join('\n') }

export const split = function (axes) {
    const raxes = [], iaxes = [], aaxes = [...axes.keys()]

    for (let i = 0; i < axes.length; i++)
        axes[i] === AXIS_INNER_CHARACTER ? iaxes.push(i) : raxes.push(i)

    return [raxes, iaxes, aaxes]
}

export const flatindex = function (axes, array, initial, index) {
    let resultindex = initial + array.header.offset
    let dimensionality = 1

    for (const axis of axes.slice().reverse()) {
        const base = array.header.shape[axis]
        const place = array.header.strides[axis]
        const digit = Math.floor(index / dimensionality) % base

        dimensionality *= base
        resultindex += digit * place
    }

    return resultindex
}

export const litassign = function ({ count, map, reduce, metaindices }) {
    const assignments = new Array(count)

    for (let i = 0; i < assignments.length; i++)
        assignments[i] = map(...metaindices.map(function (metaindex) {
            return flatindex(...metaindex, i)
        }))

    return reduce(assignments)
}

export const loop = function (array) {
    return function (i, j) {
        return `for(let a${i} = 0; a${i} < args.${array}.header.shape[${i}]; a${i}++){`
    }
}

export const index = function (array, offset) {
    return function (i, j) {
        return `a${i + offset} * args.${array}.header.strides[${j}]`
    }
}

export const symindex = function (axes, array, offset = 0) {
    return `args.${array}.header.offset + ${axes.map(index(array, offset)).join(' + ')}`
}

export const symloops = function (axes, array, body) {
    return `${axes.map(loop(array)).join('\n')} 
                ${body} 
            ${'}'.repeat(axes.length)}`
}
