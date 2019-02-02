import nd from '../../array'
import jest from '../engine'

export default function () {
    let A, B, C, D, E

    console.log('\n\n-------- Linear Algebra Suite --------\n\n')

    A = nd.array({
        from: [
            [10, 72, 91, 13],
            [57, 44, 49, 33],
            [90, 66, 23, 21]
        ]
    })

    B = nd.array({
        from: [
            [17, 11, 19],
            [41, 15, 11],
            [16, 14, 15]
        ]
    })

    D = nd.array({
        from: [
            [2, 2, 1],
            [4, 2, 6],
            [4, 2, 2]
        ]
    })

    C = nd.array({ from: [[1], [2], [3]] })

    E = nd.array({
        from: [[[10, 5, 2],
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
    jest.expect(nd.inv({ of: nd.array({ from: [[6, 4], [5, 2]] }) })).toEqual([[-0.25, 0.5], [0.625, -0.75]])

    jest.expect(E.slice({ indices: [':', 0, ':'] }).dot({ with: C })).toEqual([[26], [74], [109]])
    jest.expect(E.slice({ indices: [':', 0, ':'] }).inv({}))
        .toEqual([
            [-0.019677996422182466, 0.012522361359570666, 0.005366726296958853],
            [0.11627906976744196, 0.07751937984496123, -0.062015503875968984],
            [0.3076923076923075, -0.2564102564102564, 0.1282051282051282]
        ])

    console.log('\n\n-------- End Linear Algebra Suite --------\n\n')
}
