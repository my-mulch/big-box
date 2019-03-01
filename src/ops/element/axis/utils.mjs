import { AXIS_INNER_CHARACTER } from '../../../../contants'

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

export const split = function (axes) {
    const raxes = [], iaxes = [], aaxes = [...axes.keys()]

    for (let i = 0; i < axes.length; i++)
        axes[i] === AXIS_INNER_CHARACTER ? iaxes.push(i) : raxes.push(i)

    return [raxes, iaxes, aaxes]
}

export const symindex = function (axes, array) {
    return `args.${array}.header.offset + ${axes.map(index(array)).join(' + ')}`
}

export const symloops = function (axes, array, body) {
    return `${axes.map(loop(array)).join('\n')} 
                ${body} 
            ${'}'.repeat(axes.length)}`
}


/** ------------------------------------------------- OPTIMIZED SUITE UTILITY METHODS ------------------------------------------------- */

export const litassign = function (callback) {
    return new Array(this.result.header.size).fill(null).map(function (_, index) {
        const axisNumeric = aslice(this.axes, resultIndexMapper)
        const rg = axisNumeric.reduce(resultIndexLiteral.call(this.of, index), this.of.header.offset)
        const ri = axisNumeric.reduce(resultIndexLiteral.call(this.result, index), this.result.header.offset)

        return callback(ri, rg)
    }, this)
}

export const inassign = function (callback, rg) {
    return new Array(this.of.header.size / this.result.header.size).fill(null).map(function (_, index) {
        const axisNumeric = aslice(this.axes, innerIndexMapper)
        const ai = axisNumeric.reduce(resultIndexLiteral.call(this.of, index), rg)

        return callback(`args.of.data[${ai}]`)
    }, this)
}

const resultIndexLiteral = function (index, array) {
    return function (resultIndex, axis) {
        return resultIndex +
            Math.floor(index / array.header.strides[axis]) %
            array.header.shape[axis] *
            array.header.strides[axis]
    }
}

/** ------------------------------------------------- OPTIMIZED SUITE UTILITY METHODS ------------------------------------------------- */
