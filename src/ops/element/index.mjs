import axis from './axis'
import pair from './pair'

/** --------------------- MAPPERS --------------------- */
export const noop = function (a) { return a }
export const square = function (a) { return a * a }
export const sqrt = function (a) { return Math.sqrt(a) }
export const abs = function (a) { return Math.abs(a) }
export const round = function (p, a) { return +a.toFixed(p) } // bind me!

/** --------------------- REDUCERS --------------------- */
export const sum = function (a, b) { return a + b }
export const prod = function (a, b) { return a * b }
export const quot = function (a, b) { return a / b }
export const diff = function (a, b) { return a - b }
export const mod = function (a, b) { return a % b }
export const min = function (a, b) { return Math.min(a, b) }
export const max = function (a, b) { return Math.max(a, b) }
export const pow = function (a, b) { return Math.pow(a, b) }

/** --------------------- SINGLES --------------------- */
export const range = function ({ start, step, stop, R }) {
    for (let i = start, j = 0; i < stop; i += step, j++)
        R.data[j] = i

    return R
}

/** --------------------- SUITES --------------------- */

export const pairSuite = pair
export const axisSuite = axis
