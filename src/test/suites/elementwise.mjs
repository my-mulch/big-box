import nd from '../../array'

export default function (FakeJest) {
    let A, B, C

    console.log('\n\n-------- Elementwise Suite --------\n\n')

    A = nd.array({
        of:
            [[[[17, 36], [29, 36], [-12, 21]], [[1, 21], [21, 24], [-5, 1]]], [[[35, 44], [21, 26], [-8, -15]], [[-2, 16], [-13, 24], [7, 11]]]]
    })

    B = nd.array({
        of: [[[[[-15, 0]]], [[[39, 25]]]],
        [[[[-8, 40]]], [[[32, 6]]]]]
    })

    C = nd.array({ of: [[-46, 19], [-38, 9], [9, -15], [-25, -33]] })

    FakeJest.expect(A.min({ axes: [[...A.header.shape.keys()], []] })).toEqual(-15)
    FakeJest.expect(B.min({ axes: [[...B.header.shape.keys()], []] })).toEqual(-15)
    FakeJest.expect(A.min({ axes: [[0, 3], [1, 2]] })).toEqual([[17, 21, -15], [-2, -13, -5]])

    FakeJest.expect(C.plus({ against: C })).toEqual([[-46 * 2, 19 * 2], [-38 * 2, 9 * 2], [9 * 2, -15 * 2], [-25 * 2, -33 * 2]])

    console.log('\n\n-------- End Elementwise Suite --------\n\n')
}
