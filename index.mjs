import ndim from './src/ndarray/index.mjs'
const A = ndim.array([
    [
        [2, 3],
        [4, 5],
        [8, 9]
    ],
    [
        [2, 3],
        [4, 5],
        [4, 7]
    ]
])

console.log(A.header)
const B = A.slice(-1)
console.log(B.header)
console.log(B)