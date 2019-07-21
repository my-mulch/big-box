import nd from '../../main/array'
import jest from '../engine'

export default function () {
    let A, B, C, D, E

    console.log('\n\n-------- Elementwise Suite --------\n\n')

    A = nd.array({
        with:
            [
                [
                    [
                        [17, 36],
                        [29, 36],
                        [-12, 21]
                    ],

                    [
                        [1, 21],
                        [21, 24],
                        [-5, 1]
                    ]
                ],


                [
                    [
                        [35, 44],
                        [21, 26],
                        [-8, -15]
                    ],

                    [
                        [-2, 16],
                        [-13, 24],
                        [7, 11]
                    ]
                ]
            ]
    })

    B = nd.array({
        with: [
            [-46, 19],
            [-38, 9],
            [9, -15],
            [-25, -33]
        ]
    })

    C = nd.array({
        with: [[[10, 5, 2],
        [72, 6, 3],
        [91, 6, 1],
        [13, 4, 12]],

        [[57, 7, 1],
        [44, 2, 2],
        [49, 8, 4],
        [-33, 8, 5]],

        [[90, 2, 5],
        [66, 4, 3],
        [23, 1, 2],
        [21, 2, 2]]]
    })

    D = nd.ones({ shape: [41, 47] })

    E = nd.array({
        with: [
            ['1 + i', '10 + 10i', '100 + 100i'],
            ['1 + i', '10 + 10i', '100 + 100i'],
            ['1 + i', '10 + 10i', '100 + 100i'],
            ['1 + i', '10 + 10i', '100 + 100i'],
        ]
    })

    jest.expect(B.multiply({ with: 6 })).toEqual([[-276, 114], [-228, 54], [54, -90], [-150, -198]])

    jest.expect(A.min()).toEqual([-15])
    jest.expect(A.min({ axes: '-**-' })).toEqual([
        [17, 21, -15],
        [-2, -13, -5]
    ])

    jest.expect(A.max()).toEqual([44])
    jest.expect(A.max({ axes: '-**-' })).toEqual([
        [44, 36, 21],
        [21, 24, 11]
    ])


    jest.expect(B.add({ with: B })).toEqual([[-46 * 2, 19 * 2], [-38 * 2, 9 * 2], [9 * 2, -15 * 2], [-25 * 2, -33 * 2]])
    jest.expect(B.multiply({ with: B })).toEqual([[-46 * -46, 19 * 19], [-38 * -38, 9 * 9], [9 * 9, -15 * -15], [-25 * -25, -33 * -33]])
    jest.expect(B.subtract({ with: B })).toEqual(nd.zeros({ shape: B.shape }))

    jest.expect(D.copy().set({ with: 2 })).toEqual(D.add({ with: D }))
    jest.expect(D.slice({ with: [0] }).set({ with: 2 })).toEqual([2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2])
    jest.expect(D.slice({ with: [':'] }).set({ with: [6, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2] })).toEqual(D)
    jest.expect(D.add({ with: 1 })).toEqual(new Array(41).fill([7, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3]))

    jest.expect(C.slice({ with: [':', 0, ':'] }).min()).toEqual([1])
    jest.expect(C.slice({ with: [':', 0, ':'] }).divide({ with: C.slice({ with: [':', 0, ':'] }) })).toEqual([[1, 1, 1], [1, 1, 1], [1, 1, 1]])

    jest.expect(B.mean()).toEqual([-15])
    jest.expect(B.mean({ axes: '*-' })).toEqual([-13.5, -14.5, -3., -29.])
    jest.expect(B.mean({ axes: '-*' })).toEqual([-25, -5])

    jest.expect(D.slice({ with: [':', '2:46'] }).mean({ axes: '--' })).toEqual([2])
    jest.expect(D.slice({ with: [':', '2:46'] }).mean({ axes: '-*' })).toEqual([2., 2., 2., 2., 2., 2., 2., 2., 2., 2., 2., 2., 2., 2., 2., 2., 2., 2., 2., 2., 2., 2., 2., 2., 2., 2., 2., 2., 2., 2., 2., 2., 2., 2., 2., 2., 2., 2., 2., 2., 2., 2., 2., 2.])
    jest.expect(D.slice({ with: [':', '2:46'] }).mean({ axes: '*-' })).toEqual([2., 2., 2., 2., 2., 2., 2., 2., 2., 2., 2., 2., 2., 2., 2., 2., 2., 2., 2., 2., 2., 2., 2., 2., 2., 2., 2., 2., 2., 2., 2., 2., 2., 2., 2., 2., 2., 2., 2., 2., 2.])

    jest.expect(D.slice({ with: [':', '2:46'] }).max({ axes: '--' })).toEqual([2])
    jest.expect(D.slice({ with: [':', '2:46'] }).max({ axes: '-*' })).toEqual([2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2])
    jest.expect(D.slice({ with: [':', '2:46'] }).max({ axes: '*-' })).toEqual([2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2])

    jest.expect(B.ravel()).toEqual([-46, 19, -38, 9, 9, -15, -25, -33])
    jest.expect(B.T().ravel()).toEqual([-46, -38, 9, -25, 19, 9, -15, -33])

    jest.expect(E.ravel()).toEqual([
        '1 + i', '10 + 10i', '100 + 100i',
        '1 + i', '10 + 10i', '100 + 100i',
        '1 + i', '10 + 10i', '100 + 100i',
        '1 + i', '10 + 10i', '100 + 100i'
    ])

    console.log('\n\n-------- End Elementwise Suite --------\n\n')
}
