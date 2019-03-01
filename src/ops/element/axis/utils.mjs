import { AXIS_INNER_KEEP_CHARACTER, AXIS_INNER_CHARACTER, AXIS_RESULT_CHARACTER, INNER } from '../../../../contants'


const truthy = function () { return true }

const aslice = function (axes, match) { return Array.from(axes).map(match).filter(truthy) }
const loop = function (i) { return `for(let a${i} = 0; a${i} < args.of.header.shape[${i}]; a${i}++){` }
const index = function (array) { return function (i, j) { return `a${i} * args.${array}.header.strides[${j}]` } }

const resultLoopMapper = function (axis, i) { if (axis === AXIS_RESULT_CHARACTER || axis === AXIS_INNER_KEEP_CHARACTER) return i }
const innerLoopMapper = function (axis, i) { if (axis === AXIS_INNER_CHARACTER || axis === AXIS_INNER_KEEP_CHARACTER) return i }
const resultIndexMapper = function (axis, i) { if (axis === AXIS_RESULT_CHARACTER || axis === AXIS_INNER_KEEP_CHARACTER) return i }
const innerIndexMapper = function (i) { return i }


/** ------------------------------------------------- GENERIC SUITE UTILITY METHODS ------------------------------------------------- */

export const symindex = function (axes, array) {
    const axesNumeric = aslice(axes, array === INNER ? innerIndexMapper : resultIndexMapper)

    return `args.${array}.header.offset + ` + axesNumeric.map(index(array))
}

export const symloops = function (axes, array, body) {
    const axesNumeric = aslice(axes, array === INNER ? innerLoopMapper : resultLoopMapper)

    return `${axesNumeric.map(loop)} ${body} ${'}'.repeat(axesNumeric.length)}`
}

/** ------------------------------------------------- GENERIC SUITE UTILITY METHODS ------------------------------------------------- */




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
