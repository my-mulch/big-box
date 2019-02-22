import { AXIS_INNER_KEEP_CHARACTER, AXIS_INNER_CHARACTER, AXIS_RESULT_CHARACTER } from '../../../../contants'

/** ------------------------------------------------- GENERIC SUITE UTILITY METHODS ------------------------------------------------- */

export const resultLoops = function (axes, body) { return loopGeneric(axes, body, resultLoopMapper) }
export const innerLoops = function (axes, body) { return loopGeneric(axes, body, innerLoopMapper) }

export const resultIndex = function (axes) { return indexGeneric(axes, 'result', resultIndexMapper) }
export const innerIndex = function (axes) { return indexGeneric(axes, 'of', innerIndexMapper) }
export const axisIndex = function (axes, match) { return Array.from(axes).map(match).filter(truthy) }

const index = function (array) { return function (i, j) { return `a${i} * args.${array}.header.strides[${j}]` } }
const indexGeneric = function (axes, array, match) {
    const axesNumeric = axisIndex(axes, match)
    return `args.${array}.header.offset + ` + axesNumeric.map(index(array))
}

const loop = function (i) { return `for(let a${i} = 0; a${i} < args.of.header.shape[${i}]; a${i}++){` }
const loopGeneric = function (axes, body, match) {
    const axesNumeric = axisIndex(axes, match)
    return `${axesNumeric.map(loop)} ${body} ${'}'.repeat(axesNumeric.length)}`
}

const resultLoopMapper = function (axis, i) { if (axis === AXIS_RESULT_CHARACTER || axis === AXIS_INNER_KEEP_CHARACTER) return i }
const innerLoopMapper = function (axis, i) { if (axis === AXIS_INNER_CHARACTER || axis === AXIS_INNER_KEEP_CHARACTER) return i }

const resultIndexMapper = resultLoopMapper
const innerIndexMapper = function (i) { return i }

const truthy = function () { return true }

/** ------------------------------------------------- GENERIC SUITE UTILITY METHODS ------------------------------------------------- */




/** ------------------------------------------------- OPTIMIZED SUITE UTILITY METHODS ------------------------------------------------- */

export const resultAssign = function (callback) {
    return new Array(this.result.header.size).fill(null).map(function (_, index) {
        const axisNumeric = axisIndex(this.axes, resultIndexMapper)
        const rg = axisNumeric.reduce(resultIndexLiteral(index, this.of), this.of.header.offset)
        const ri = axisNumeric.reduce(resultIndexLiteral(index, this.result), this.result.header.offset)

        return callback(ri, rg)
    }, this)
}

export const innerAssign = function (callback, rg) {
    return new Array(this.of.header.size / this.result.header.size).fill(null).map(function (_, index) {
        const axisNumeric = axisIndex(this.axes, innerIndexMapper)
        const ai = axisNumeric.reduce(resultIndexLiteral(index, this.of), rg)

        return callback(`args.of.data[${ai}]`)
    })
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