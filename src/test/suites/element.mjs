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

    E = nd.array({
        with: [
            ['1 + i', '10 + 10i', '100 + 100i'],
            ['1 + i', '10 + 10i', '100 + 100i'],
            ['1 + i', '10 + 10i', '100 + 100i'],
            ['1 + i', '10 + 10i', '100 + 100i'],
        ]
    })

    const F = nd.array({
        with: [[[[0],
        [0],
        [0]]],


        [[[2],
        [2],
        [1]]],


        [[[4],
        [4],
        [2]]],


        [[[2],
        [2],
        [2]]],


        [[[3],
        [4],
        [3]]]]
    })

    const G = nd.array({
        with: [[[[3, 2],
        [3, 3],
        [4, 2]],

        [[4, 4],
        [1, 2],
        [0, 3]],

        [[4, 1],
        [1, 1],
        [4, 1]],

        [[3, 3],
        [0, 3],
        [4, 3]]]]
    })

    const H = nd.array({
        with: [[[[3, 2],
        [3, 3],
        [4, 2]],

        [[4, 4],
        [1, 2],
        [0, 3]],

        [[4, 1],
        [1, 1],
        [4, 1]],

        [[3, 3],
        [0, 3],
        [4, 3]]],


        [[[5, 4],
        [5, 5],
        [5, 3]],

        [[6, 6],
        [3, 4],
        [1, 4]],

        [[6, 3],
        [3, 3],
        [5, 2]],

        [[5, 5],
        [2, 5],
        [5, 4]]],


        [[[7, 6],
        [7, 7],
        [6, 4]],

        [[8, 8],
        [5, 6],
        [2, 5]],

        [[8, 5],
        [5, 5],
        [6, 3]],

        [[7, 7],
        [4, 7],
        [6, 5]]],


        [[[5, 4],
        [5, 5],
        [6, 4]],

        [[6, 6],
        [3, 4],
        [2, 5]],

        [[6, 3],
        [3, 3],
        [6, 3]],

        [[5, 5],
        [2, 5],
        [6, 5]]],


        [[[6, 5],
        [7, 7],
        [7, 5]],

        [[7, 7],
        [5, 6],
        [3, 6]],

        [[7, 4],
        [5, 5],
        [7, 4]],

        [[6, 6],
        [4, 7],
        [7, 6]]]]
    })
    const I = nd.array({
        with: [[[[[2, 1]],

        [[1, 3]]]],



        [[[[2, 2]],

        [[3, 1]]]]]
    })
    const J = nd.array({
        with: [[[[[2],
        [0]]],


        [[[0],
        [4]]]]]
    })
    const K = nd.array({
        with: [[[[3, 2],
        [3, 3],
        [4, 2]],

        [[4, 4],
        [1, 2],
        [0, 3]],

        [[4, 1],
        [1, 1],
        [4, 1]],

        [[3, 3],
        [0, 3],
        [4, 3]]],


        [[[5, 4],
        [5, 5],
        [5, 3]],

        [[6, 6],
        [3, 4],
        [1, 4]],

        [[6, 3],
        [3, 3],
        [5, 2]],

        [[5, 5],
        [2, 5],
        [5, 4]]],


        [[[7, 6],
        [7, 7],
        [6, 4]],

        [[8, 8],
        [5, 6],
        [2, 5]],

        [[8, 5],
        [5, 5],
        [6, 3]],

        [[7, 7],
        [4, 7],
        [6, 5]]],


        [[[5, 4],
        [5, 5],
        [6, 4]],

        [[6, 6],
        [3, 4],
        [2, 5]],

        [[6, 3],
        [3, 3],
        [6, 3]],

        [[5, 5],
        [2, 5],
        [6, 5]]],


        [[[6, 5],
        [7, 7],
        [7, 5]],

        [[7, 7],
        [5, 6],
        [3, 6]],

        [[7, 4],
        [5, 5],
        [7, 4]],

        [[6, 6],
        [4, 7],
        [7, 6]]]]
    })

    jest.expect(B.mean()).toEqual("-15")
    jest.expect(C.mean()).toEqual("16.66666603088379")
    jest.expect(K.mean()).toEqual("4.525000095367432")

    jest.expect(B.multiply({ with: "6" })).toEqual([["-276", "114"], ["-228", "54"], ["54", "-90"], ["-150", "-198"]])

    jest.expect(A.min()).toEqual("-15")
    jest.expect(A.min({ axes: [0, 3] })).toEqual([
        ["17", "21", "-15"],
        ["-2", "-13", "-5"]
    ])

    jest.expect(A.max()).toEqual("44")
    jest.expect(A.max({ axes: [0, 3] })).toEqual([
        ["44", "36", "21"],
        ["21", "24", "11"]
    ])


    jest.expect(B.add({ with: B })).toEqual([[`${-46 * 2}`, `${19 * 2}`], [`${-38 * 2}`, `${9 * 2}`], [`${9 * 2}`, `${-15 * 2}`], [`${-25 * 2}`, `${-33 * 2}`]])
    jest.expect(B.multiply({ with: B })).toEqual([[`${-46 * -46}`, `${-19 * -19}`], [`${-38 * -38}`, `${9 * 9}`], [`${9 * 9}`, `${-15 * -15}`], [`${-25 * -25}`, `${-33 * -33}`]])
    jest.expect(B.subtract({ with: B })).toEqual(nd.zeros({ shape: B.shape }))

    jest.expect(C.slice({ with: [':', 0, ':'] }).min()).toEqual(1)
    jest.expect(C.slice({ with: [':', 0, ':'] }).divide({ with: C.slice({ with: [':', 0, ':'] }) })).toEqual([["1", "1", "1"], ["1", "1", "1"], ["1", "1", "1"]])

    jest.expect(B.mean({ axes: [1] })).toEqual(["-13.5", "-14.5", "-3", "-29"])
    jest.expect(B.mean({ axes: [0] })).toEqual(["-25", "-5"])

    jest.expect(B.ravel()).toEqual(["-46", "19", "-38", "9", "9", "-15", "-25", "-33"])
    jest.expect(B.T().ravel()).toEqual(["-46", "-38", "9", "-25", "19", "9", "-15", "-33"])

    jest.expect(E.ravel()).toEqual([
        '1 + i', '10 + 10i', '100 + 100i',
        '1 + i', '10 + 10i', '100 + 100i',
        '1 + i', '10 + 10i', '100 + 100i',
        '1 + i', '10 + 10i', '100 + 100i'
    ])

    jest.expect(F.add({ with: G })).toEqual(H)
    jest.expect(I.add({ with: J })).toEqual([[[[["4", "3"], ["2", "1"]], [["3", "5"], ["1", "3"]]], [[["2", "1"], ["6", "5"]], [["1", "3"], ["5", "7"]]]], [[[["4", "4"], ["2", "2"]], [["5", "3"], ["3", "1"]]], [[["2", "2"], ["6", "6"]], [["3", "1"], ["7", "5"]]]]])

    console.log('\n\n-------- End Elementwise Suite --------\n\n')
}
