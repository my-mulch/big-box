export const __Math__ = Object.assign(Math, {
    add: function (a, b) { return a + b },
    subtract: function (a, b) { return a - b },
    divide: function (a, b) { return a / b },
    multiply: function (a, b) { return a * b },
})

export const sizeup = function sizeup(A, shape = []) {
    if (A.constructor === Number || A.constructor === String)
        return shape

    return sizeup(A[0], shape.concat(A.length))
}
