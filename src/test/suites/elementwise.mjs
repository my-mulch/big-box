import nd from '../../array'

export default function (FakeJest) {
    let A, B, C

    console.log('\n\n-------- Elementwise Suite --------\n\n')

    A = nd.array([[[[17, 36], [29, 36], [-12, 21]], [[1, 21], [21, 24], [-5, 1]]], [[[35, 44], [21, 26], [-8, -15]], [[-2, 16], [-13, 24], [7, 11]]]])
    B = nd.array([[[[[-15, 0]]], [[[39, 25]]]], [[[[-8, 40]]], [[[32, 6]]]]])
    C = nd.array([[-46, 19], [-38, 9], [9, -15], [-25, -33]])

    FakeJest.expect(A.min()).toEqual(-15)
    FakeJest.expect(B.min()).toEqual(-15)

    // FakeJest.expect(A.min(1)).toEqual([[[1, 21], [21, 24], [-12, 1]], [[-2, 16], [-13, 24], [-8, -15]]])
    C.mean(1)

    console.log('\n\n-------- End Elementwise Suite --------\n\n')
}
