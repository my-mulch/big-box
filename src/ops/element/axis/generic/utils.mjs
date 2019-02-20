import { AXIS_INNER_KEEP_CHARACTER, AXIS_INNER_CHARACTER, AXIS_RESULT_CHARACTER } from '../../../../contants'

export const resultLoops = function (axes, body) { return loopGeneric(axes, body, resultLoopMatch) }
export const resultIndex = function (axes) { return indexGeneric(axes, 'args.result.header.offset', resultIndexMatch) }

export const innerLoops = function (axes, body) { return loopGeneric(axes, body, innerLoopMatch) }
export const innerIndex = function (axes, body) { return indexGeneric(axes, 'args.of.header.offset', innerIndexMatch) }

const resultLoopMatch = function (axis, i) { if (axis === AXIS_RESULT_CHARACTER || axis === AXIS_INNER_KEEP_CHARACTER) return i }
const resultIndexMatch = function (axis, i) { return resultLoopMatch(axis, i) }
const innerLoopMatch = function (axis, i) { if (axis === AXIS_INNER_CHARACTER || axis === AXIS_INNER_KEEP_CHARACTER) return i }
const innerIndexMatch = function (axis, i) { return i }

const index = function (i, j) { return `a${i} * args.result.header.strides[${j}]` }
const indexGeneric = function (axes, offset, match) {
    const axesNumeric = convert(axes, match)
    return `${offset} + ${axesNumeric.map(index).join('+') || 0}`
}

const loop = function (i) { return `for(let a${i} = 0; a${i} < args.of.header.shape[${i}]; a${i}++){` }
const loopGeneric = function (axes, body, match) {
    const axesNumeric = convert(axes, match)
    return `${axesNumeric.map(loop)} ${body} ${'}'.repeat(axesNumeric.length)}`
}

const truthy = function () { return true }
const convert = function (axes, match) { return Array.from(axes).map(match).filter(truthy) }
