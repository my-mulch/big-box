import axis from './axis'
import pair from './pair'

/** --------------------- MAPPERS --------------------- */
export const noop = function (a) { return a }
export const square = function (a) { return a * a }
export const round = function (p, a) { return +a.toFixed(p) } // bind me!

/** --------------------- REDUCERS --------------------- */
export const add = function (a, b) { return a + b }
export const multiply = function (a, b) { return a * b }
export const divide = function (a, b) { return a / b }
export const subtract = function (a, b) { return a - b }
export const mod = function (a, b) { return a % b }
export const min = function (a, b) { return Math.min(a, b) }
export const max = function (a, b) { return Math.max(a, b) }
export const pow = function (a, b) { return Math.pow(a, b) }

/** --------------------- SINGLES --------------------- */
export const range = function (args) {
    for (let i = args.start, j = 0; i < args.stop; i += args.step, j++)
        args.result.data[j] = i

    return args.result
}

export const fill = function (args) {
    if (args.values.constructor === Number)
        args.result.data.fill(args.values)

    else if (args.values.constructor === Function)
        for (let i = 0; i < args.result.data.length; i++)
            args.result.data[i] = args.values()

    else if (args.values.constructor === Array) {
        const flat = args.values.flat(args.result.header.shape.length)

        for (let i = 0; i < flat.length; i++)
            args.result.data[i] = flat[i]
    }

    return args.result
}

/** --------------------- SUITES --------------------- */

export const pairSuite = pair
export const axisSuite = axis
