import nd from '../ndarray'

const A = nd.array([
    [
        [152, 43, 90, 1],
        [191, 181, 82, 1]
    ],
    [
        [105, 146, 4, 1],
        [232, 144, 228, 1]
    ],
    [
        [10, 70, 34, 1],
        [21, 210, 168, 1]
    ]
], 'float64')


// const meanPixel = A.mean(0, 1).reshape(4, 1)
// const x = meanPixel.slice(0, 0)
// const y = meanPixel.slice(0, 1)
// const z = meanPixel.slice(0, 2)
// const w = meanPixel.slice(0, 3)

// const center = nd.array([
//     [1, 0, 0, -x],
//     [0, 1, 0, -y],
//     [0, 0, 1, -z],
//     [0, 0, 0, 1]
// ])


// console.log(center.dot(A.reshape(6, 4).T()))
console.log(A.slice(':', 1, ':').reshape(12))