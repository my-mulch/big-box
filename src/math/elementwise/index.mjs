import axisSuite from './axis'
import pairSuite from './pair'

/** REDUCERS */
export const sum = function (a, b) { return a + b }
export const prod = function (a, b) { return a * b }
export const quot = function (a, b) { return a / b }
export const diff = function (a, b) { return a - b }
export const mod = function (a, b) { return a % b }
export const min = function (a, b) { return Math.min(a, b) }
export const max = function (a, b) { return Math.max(a, b) }
export const pow = function (a, b) { return Math.pow(a, b) }

export const mean = function (a, b, i, size) { return i + 1 < size ? a + b : (a + b) / size }
export const norm = function (a, b, i, size) { return i + 1 < size ? a + b : Math.sqrt(a + b) }

/** MAPPERS */
export const square = function (a) { return a * a }
export const sqrt = function (a) { return Math.sqrt(a) }
export const abs = function (a) { return Math.abs(a) }
export const noop = function (a) { return a }
export const round = function (p, a) { return +a.toFixed(p) } // bind me!

/** SUITES */
export const pairWise = function ({ R, A, B, reducer }) { return pairSuite.call(R, A, B, reducer) }
export const axisWise = function ({ R, A, mapper, reducer }) { return axisSuite.call(R, A, mapper, reducer) }
