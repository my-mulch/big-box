
export default Object.assign(Math, {
    add: function (a, b) { return a + b },
    subtract: function (a, b) { return a - b },
    divide: function (a, b) { return a / b },
    multiply: function (a, b) { return a * b },

    intersection: function (a1, a2) {
        return a1.filter(function (value) {
            return a2.includes(value)
        })
    },

    difference: function (a1, a2) {
        return a1.filter(function (value) {
            return !a2.includes(value)
        })
    }
})
