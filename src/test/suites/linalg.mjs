import nd from '../../main/array'
import jest from '../engine'

export default function () {
    let A, B, C, D, E

    console.log('\n\n-------- Linear Algebra Suite --------\n\n')

    A = nd.array({
        with: [
            [10, 72, 91, 13],
            [57, 44, 49, 33],
            [90, 66, 23, 21]
        ]
    })

    B = nd.array({
        with: [
            [17, 11, 19],
            [41, 15, 11],
            [16, 14, 15]
        ]
    })

    D = nd.array({
        with: [
            [2, 2, 1],
            [4, 2, 6],
            [4, 2, 2]
        ]
    })

    C = nd.array({ with: [[1], [2], [3]] })

    E = nd.array({
        with: [[[10, 5, 2],
        [72, 6, 3],
        [91, 6, 1],
        [13, 4, 12]],

        [[57, 7, 1],
        [44, 2, 2],
        [49, 8, 4],
        [33, 8, 5]],

        [[90, 2, 5],
        [66, 4, 3],
        [23, 1, 2],
        [21, 2, 2]]]
    })

    jest.expect(B.dot({ with: A })).toEqual(([[2507, 2962, 2523, 983], [2255, 4338, 4719, 1259], [2308, 2758, 2487, 985]]))
    jest.expect(B.dot({ with: C })).toEqual([[96], [104], [89]])

    jest.expect(A.T()).toEqual([[10, 57, 90], [72, 44, 66], [91, 49, 23], [13, 33, 21]])

    jest.expect(nd.inv({ of: D })).toEqual([[-0.5, -0.125, 0.625], [1., 0., -0.5], [0., 0.25, -0.25]])
    jest.expect(nd.inv({ of: nd.array({ with: [[6, 4], [5, 2]] }) })).toEqual([[-0.25, 0.5], [0.625, -0.75]])

    jest.expect(E.slice({ with: ['1:2', 0, ':'] }).cross({ with: C })).toEqual([[19], [-170], [107]])

    jest.expect(E.slice({ with: [':', 0, ':'] }).dot({ with: C })).toEqual([[26], [74], [109]])

    jest.expect(E.slice({ with: [':', 0, ':'] }).inv({ result: E.slice({ with: [':', 0, ':'] }).copy() })
        .round({ precision: 3 }))
        .toEqual([
            [-0.02, 0.013, 0.005],
            [0.116, 0.078, -0.062],
            [0.308, -0.256, 0.128]])

    console.log('\n\n-------- End Linear Algebra Suite --------\n\n')
}
