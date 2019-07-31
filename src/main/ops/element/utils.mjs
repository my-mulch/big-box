import { AXIS_INNER_CHARACTER } from '../../../resources'

export const bylines = function (items) { return items.join('\n') }

export const split = function (axes) {
    const outerLoops = [], innerLoops = [], allLoops = [...Array.from(axes).keys()]

    for (let i = 0; i < axes.length; i++)
        axes[i] === AXIS_INNER_CHARACTER ? innerLoops.push(i) : outerLoops.push(i)

    return [outerLoops, innerLoops, allLoops]
}

export const flatindex = function (axes, array, initial, index) {
    let resultindex = initial + array.offset
    let dimensionality = 1

    for (const axis of axes) {
        const base = array.shape[axis] || 1
        const place = array.strides[axis] || 0
        const digit = Math.floor(index / dimensionality) % base

        dimensionality *= base
        resultindex += digit * place
    }

    return resultindex
}

export const litassign = function ({ count, mapper, reducer, metaindices }) {
    const assignments = new Array(count)

    for (let i = 0; i < assignments.length; i++)
        assignments[i] = mapper(...metaindices.map(function ([axes, array, initial]) {
            return flatindex(axes, array, initial, i)
        }))

    return reducer(assignments)
}

export const loop = function (arrayName) {
    return function (i, j) {
        return `for(let a${i} = 0; a${i} < args.${arrayName}.shape[${i}]; a${i}++){`
    }
}

export const index = function (arrayName, array) {
    return function (_, j) {
        return array.shape[j] > 1
            ? `a${j} * args.${arrayName}.strides[${j}]`
            : 0
    }
}

export const symindex = function (axes, arrayName, array) {
    return `args.${arrayName}.offset + ${axes.map(index(arrayName, array)).join(' + ') || 0}`
}

export const symloops = function (axes, arrayName, body) {
    return [
        axes.map(loop(arrayName)).join('\n'),
        body,
        '}'.repeat(axes.length)
    ].join('\n')
}
