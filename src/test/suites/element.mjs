import nd from '../../array'
import jest from '../engine'

export default function () {
    let A, B, C

    console.log('\n\n-------- Elementwise Suite --------\n\n')

    A = nd.array({
        from:
            [[[[17, 36],
            [29, 36],
            [-12, 21]],

            [[1, 21],
            [21, 24],
            [-5, 1]]],


            [[[35, 44],
            [21, 26],
            [-8, -15]],

            [[-2, 16],
            [-13, 24],
            [7, 11]]]]
    })

    B = nd.array({
        from: [
            [[[[-15, 0]]], [[[39, 25]]]],
            [[[[-8, 40]]], [[[32, 6]]]]
        ]
    })

    C = nd.array({ from: [[-46, 19], [-38, 9], [9, -15], [-25, -33]] })

    jest.expect(A.min({ axes: [[0, 1, 2, 3], []] })).toEqual(-15)
    jest.expect(A.min({ axes: [[0, 3], [1, 2]] })).toEqual([[17, 21, -15], [-2, -13, -5]])

    jest.expect(C.add({ with: C })).toEqual([[-46 * 2, 19 * 2], [-38 * 2, 9 * 2], [9 * 2, -15 * 2], [-25 * 2, -33 * 2]])
    jest.expect(C.multiply({ with: C })).toEqual([[-46 * -46, 19 * 19], [-38 * -38, 9 * 9], [9 * 9, -15 * -15], [-25 * -25, -33 * -33]])

    console.log('\n\n-------- End Elementwise Suite --------\n\n')
}
