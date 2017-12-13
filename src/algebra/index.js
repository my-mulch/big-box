


function parse(equation) {
    const unknowns = /\d*\w+(\^\d+)*\s*/g
    const variable = new RegExp(/\d*/ + /[a-zA-Z]+/)
    const exponent = new RegExp(/\d*/)
}

parse('2abc^3 + b = c')

function prod(array) {
    return array.reduce(function (acc, val) {
        return acc * val
    })
}

module.exports = { prod }
