const { traverse } = require('../../utils')
const ops = require('../ops')

function add(...arrays) {
    return [...traverse(ops.add, arrays)]
}

function subtract(...arrays) {
    return [...traverse(ops.sub, arrays)]
}

function multiply(...arrays) {
    return [...traverse(ops.mult, arrays)]
}

function divide(...arrays) {
    return [...traverse(ops.div, arrays)]
}

module.exports = {
    add,
    subtract,
    multiply,
    divide
}
