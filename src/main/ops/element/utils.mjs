import { AXIS_INNER_CHARACTER } from '../../../resources'

export const bylines = function (items) { return items.join('\n') }

export const split = function (axes) {
    const raxes = [], iaxes = [], aaxes = [...axes.keys()]

    for (let i = 0; i < axes.length; i++)
        axes[i] === AXIS_INNER_CHARACTER ? iaxes.push(i) : raxes.push(i)

    return [raxes, iaxes, aaxes]
}

export const flatindex = function (axes, array, initial, index) {
    let resultindex = initial + array.offset
    let dimensionality = 1

    for (const axis of axes.slice().reverse()) {
        const base = array.shape[axis]
        const place = array.strides[axis]
        const digit = Math.floor(index / dimensionality) % base

        dimensionality *= base
        resultindex += digit * place
    }

    return resultindex
}

export const litassign = function ({ count, mapper, reducer, metaindices }) {
    const assignments = new Array(count)

    for (let i = 0; i < assignments.length; i++)
        assignments[i] = mapper(...metaindices.map(function (metaindex) {
            return flatindex(...metaindex, i)
        }))

    return reducer(assignments)
}

export const loop = function (array) {
    return function (i, j) {
        return `for(let a${i} = 0; a${i} < args.${array}.shape[${i}]; a${i}++){`
    }
}

export const index = function (array, offset) {
    return function (i, j) {
        return `a${i + offset} * args.${array}.strides[${j}]`
    }
}

export const symindex = function (axes, array, offset = 0) {
    return `args.${array}.offset + ${axes.map(index(array, offset)).join(' + ') || 0}`
}

export const symloops = function (axes, array, body) {
    return `${axes.map(loop(array)).join('\n')} 
                ${body} 
            ${'}'.repeat(axes.length)}`
}
