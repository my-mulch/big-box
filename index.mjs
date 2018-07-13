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

console.log(A.dot(B))