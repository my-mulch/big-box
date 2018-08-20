import ndim from './src/ndarray'

const A = ndim.array([
    [
        [5, 9],
        [1, 8],
    ],
    [
        [2, 5],
        [6, 7],
    ]
], 'uint8')

const B = ndim.array([
    [5],
    [5],
    [3],
    [2]
], 'uint8')

console.log(A.slice(':', 0, ':').reshape(1, 4).dot(B))