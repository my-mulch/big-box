const { elementwiseTraverse } = require('../../../utils/array')
const ops = require('../scalar')

function add(A, B) {
    return [...elementwiseTraverse(ops.add, A, B)]
}

function subtract(A, B) {
    return [...elementwiseTraverse(ops.sub, A, B)]
}

function multiply(A, B) {
    return [...elementwiseTraverse(ops.mult, A, B)]
}

function divide(A, B) {
    return [...elementwiseTraverse(ops.div, A, B)]
}

function flatten(A){
    return [...elementwiseTraverse(ops.noop, A)]
}

module.exports = {
    add,
    subtract,
    multiply,
    divide,
    flatten
}
