
function add(ai, bi) {
    return ai + bi
}

function sub(ai, bi) {
    return ai - bi
}

function mult(ai, bi) {
    return ai * bi
}

function div(ai, bi) {
    return ai / bi
}

function product(array) {
    return array.reduce(mult)
}



function parse(equation) {
    const unknowns = /\d*\w+(\^\d+)*\s*/g
    const variable = new RegExp(/\d*/ + /[a-zA-Z]+/)
    const exponent = new RegExp(/\d*/)
}

parse('2abc^3 + b = c')

module.exports = {
    product,
    add,
    mult,
    div,
    sub
}