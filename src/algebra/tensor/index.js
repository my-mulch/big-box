const ops = require('../ops')

function add(...arrays) {
    return elementwiseTensorOperation(ops.add, arrays)
}

function subtract(...arrays) {
    return elementwiseTensorOperation(ops.sub, arrays)
}

function multiply(...arrays) {
    return elementwiseTensorOperation(ops.mult, arrays)
}

function divide(...arrays) {
    return elementwiseTensorOperation(ops.div, arrays)
}

module.exports = {
    add,
    subtract,
    multiply,
    divide
}
