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

const B = ndim.array([1, 2, 3, 4], 'uint8')
console.log(A.header)

const gen = A.toGenerator(2)
console.log(gen.next().value, gen.next().value)