import { AXIS_INNER_KEEP_CHARACTER, AXIS_INNER_CHARACTER, AXIS_RESULT_CHARACTER } from '../../../../contants'

export const resultLoops = function (axes, body) { return loopGeneric(axes, body, resultLoopMatch) }
export const innerLoops = function (axes, body) { return loopGeneric(axes, body, innerLoopMatch) }

export const resultIndex = function (axes) { return indexGeneric(axes, 'result', resultIndexMatch) }
export const innerIndex = function (axes) { return indexGeneric(axes, 'of', innerIndexMatch) }

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

const resultLoopMatch = function (axis, i) { if (axis === AXIS_RESULT_CHARACTER || axis === AXIS_INNER_KEEP_CHARACTER) return i }
const innerLoopMatch = function (axis, i) { if (axis === AXIS_INNER_CHARACTER || axis === AXIS_INNER_KEEP_CHARACTER) return i }

const resultIndexMatch = resultLoopMatch
const innerIndexMatch = function (i) { return i }

const truthy = function () { return true }
