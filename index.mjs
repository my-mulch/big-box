import ndim from './src/ndarray'

const A = ndim.array([
    [
        [152, 43, 90],
        [191, 181, 82]
    ],
    [
        [105, 146, 4],
        [232, 144, 228]
    ],
    [
        [10, 70, 34],
        [21, 210, 168]
    ]
], 'float64')

console.log(A.header)
console.log(A.norm([2, 1]))