
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

function noop(ai, bi) {
    return ai
}

module.exports = {
    product,
    add,
    mult,
    div,
    sub,
    noop
}