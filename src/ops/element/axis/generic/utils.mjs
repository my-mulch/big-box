import { AXIS_INNER_KEEP_CHARACTER, AXIS_INNER_CHARACTER, AXIS_RESULT_CHARACTER } from '../../../../contants'
// resultLoops, resultIndex, innerLoops, innerIndex

export const resultLoops = function (axes, body) { return loopGeneric(axes, body, resultLoopMatch) }
export const innerLoops = function (axes, body) { return loopGeneric(axes, body, innerLoopMatch) }

const innerLoopMatch = function (axis, i) { if (axis === AXIS_INNER_CHARACTER) return i }
const innerIndexMatch = function (axis, i) { return i }
const resultLoopMatch = function (axis, i) { if (axis === AXIS_INNER_KEEP_CHARACTER || axis === AXIS_RESULT_CHARACTER) return i }
const resultIndexMatch = function (axis, i) { return i }

const truthy = function () { return true }

const index = function (i, j) { return `a${i} * args.result.header.strides[${j}]` }
const indexGeneric = function (axes, match) {
    const axesNumeric = Array.from(axes).map(match).filter(truthy)

}

const loop = function (i) { return `for(let a${i} = 0; a${i} < args.of.header.shape[${i}]; a${i}++){` }
const loopGeneric = function (axes, body, match) {
    const axesNumeric = Array.from(axes).map(match).filter(truthy)
    return `${axesNumeric.map(loop)} ${body} ${'}'.repeat(axesNumeric.length)}`
}


export const resultIndex = function (axes) {
    let strideIndex = 0
    return 'args.result.header.offset ' + Array.from(axes)
        .map(function (axis, i) {
            if (axis === 'o')
                return `a${i} * args.result.header.strides[${strideIndex++}]`
        })
        .filter(function () { return true })
        .join('+') || 0
}


export const innerIndex = function (axes) {
    return 'args.of.header.offset ' + Array.from(axes)
        .map(function (_, i) {
            return `a${i} * args.result.header.strides[${i}]`
        })
        .join('+') || 0
}
