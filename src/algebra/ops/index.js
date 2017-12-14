
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

module.exports = {
    product,
    add,
    mult,
    div,
    sub,
}