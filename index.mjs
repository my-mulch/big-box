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

const C = ndim.arange(1000).reshape(1000, 1)
const D = ndim.arange(2000).reshape(1, 2000)

console.log(C.dot(D).slice(2))