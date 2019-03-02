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

export const litassign = function (options, callback) {
    const assignments = new Array(options.size)

    for (let i = 0; i < assignments.length; i++)
        assignments[i] = callback(...options.indices.map(function ([axes, array, initial]) {
            return flatindex(axes, array, initial, i)
        }))

    return assignments
}
