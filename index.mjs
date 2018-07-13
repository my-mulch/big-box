import ndim from './src/ndarray'

const A = ndim.array([
    [
        [7, 6, 5, 3],
        [2, 4, 4, 1],
        [8, 8, 6, 7],
        [3, 2, 4, 3]
    ],
    [
        [1, 8, 9, 1],
        [2, 0, 0, 8],
        [4, 9, 7, 3],
        [8, 6, 4, 5]
    ]
])
const B = ndim.arange(36)
console.log(B.header)
console.log(B)

console.log(B.reshape(3, 2, 2, 3).header)
console.log(B.reshape(3, 2, 2, 3))

const C = B.reshape(3, 2, 2, 3).slice(':', 0, ':', 0)
console.log(C.header)
console.log(C)

const D = C.reshape(6)
console.log(D.header)
console.log(D.data)
console.log(D)