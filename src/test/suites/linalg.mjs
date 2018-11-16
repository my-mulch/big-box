import nd from '../../array'

export default function (FakeJest) {
    let A, B, C, D

    console.log('\n\n-------- Linear Algebra Suite --------\n\n')

    A = nd.array([
        [10, 72, 91, 13],
        [57, 44, 49, 33],
        [90, 66, 23, 21]])

    B = nd.array([
        [17, 11, 19],
        [41, 15, 11],
        [16, 14, 15]])

    D = nd.array([
        [2, 2, 1],
        [4, 2, 6],
        [4, 2, 2]])

    C = nd.array([1, 2, 3])

    FakeJest.expect(B.dot(A)).toEqual(([[2507, 2962, 2523, 983], [2255, 4338, 4719, 1259], [2308, 2758, 2487, 985]]))
    FakeJest.expect(nd.array(C).dot(B)).toEqual([147, 83, 86])
    FakeJest.expect(B.dot(C)).toEqual([96, 104, 89])

    FakeJest.expect(A.T()).toEqual([[10, 57, 90], [72, 44, 66], [91, 49, 23], [13, 33, 21]])
    FakeJest.expect(nd.array([C]).T()).toEqual([[1], [2], [3]])
    FakeJest.expect(nd.array([[4, 5, 3]]).T().dot([10])).toEqual([40, 50, 30])

    FakeJest.expect(nd.inv(D)).toEqual([[-0.5, -0.125, 0.625], [1., 0., -0.5], [0., 0.25, -0.25]])
    FakeJest.expect(nd.inv([[6, 4], [5, 2]])).toEqual([[-0.25, 0.5], [0.625, -0.75]])
    FakeJest.expect(nd.cross([3, -3, 1], [4, 9, 2])).toEqual([-15, -2, 39])

    console.log('\n\n-------- End Linear Algebra Suite --------\n\n')
}
