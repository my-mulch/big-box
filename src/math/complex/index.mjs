
const REAL = 0
const IMAG = 1

const i = [0, 1]
const ZERO = [0, 0]



function add(...numbers) {
    return numbers.reduce(_helperAdd)
}

function multiply(...numbers) {
    return numbers.reduce(_helperMultiply)
}

function equals(...numbers) {
    return numbers.reduce(_helperEqual)
}

function conjgugate(z1) {
    return [z1[REAL], -z1[IMAG]]
}

function _helperMultiply(z1, z2) {
    return [
        z1[REAL] * z2[REAL] - z1[IMAG] * z2[IMAG],
        z1[REAL] * z2[IMAG] + z1[IMAG] * z2[REAL]
    ]
}

function _helperAdd(z1, z2) {
    return [z1[REAL] + z2[REAL], z1[IMAG] + z2[IMAG]]
}

function _helperEqual(z1, z2) {
    return z1[REAL] === z2[REAL] && z1[IMAG] === z2[IMAG]
}

/* --------------------__TESTS__-------------------------- */


// ASSOCIATIVE PROPERTY
console.log('true? ',
    equals(
        add(add([-5, 6], [1, -2]), [10, 6]),
        add([-5, 6], add([1, -2], [10, 6]))
    )
)

console.log(`expect i * i to equal -1: `, multiply(i, i))
