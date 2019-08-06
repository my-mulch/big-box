export const SLICE_CHARACTER = ':'

export const AXIS_INNER_CHARACTER = '-'
export const AXIS_RESULT_CHARACTER = '*'

export const SHAPE = 'shape'
export const OFFSET = 'offset'
export const CONTIG = 'contig'
export const STRIDES = 'strides'

export const NUMBER_REGEX = /\d+/
export const PARTIAL_SLICE_REGEX = /\d*:\d*/

export const __Math__ = Object.assign(Math, {
    add: function (a, b) { return a + b },
    subtract: function (a, b) { return a - b },
    divide: function (a, b) { return a / b },
    multiply: function (a, b) { return a * b },
})
