import ndim from './src/ndarray'

const B = ndim.array([
    [6, 4, 3],
    [2, 7, 1],
    [4, 8, 2],
    [1, 9, 8]
])

const A = ndim.array([
    [4, 2, 3, 6],
    [1, 2, 5, 7]
])

// console.log(B.reshape(2, 2, 3).slice(':', 0, ':'))
// console.log(B.reshape(2, 2, 3).slice(':', 0, ':').header)
console.log(B.reshape(2, 2, 3).slice(':', 0, ':').T().T().slice(':', 2).reshape(2, 1).data)