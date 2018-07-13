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

const B = ndim.arange(10)
console.log(B)