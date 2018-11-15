import nd from '../../array'

export default function (FakeJest) {
    let A, B, C

    console.log('\n\n-------- Linear Algebra Suite --------\n\n')

    A = nd.array([
        [10, 72, 91, 13],
        [57, 44, 49, 33],
        [90, 66, 23, 21]])

    B = nd.array([
        [17, 11, 19],
        [41, 15, 11],
        [16, 14, 15]])

    C = nd.array([1, 2, 3])

    FakeJest.expect(B.dot(A).toRawArray()).toEqual(([[2507, 2962, 2523, 983], [2255, 4338, 4719, 1259], [2308, 2758, 2487, 985]]))
    FakeJest.expect(nd.array(C).dot(B).toRawArray()).toEqual([147, 83, 86])
    FakeJest.expect(B.dot(C).toRawArray()).toEqual([96, 104, 89])

    FakeJest.expect(A.T().toRawArray()).toEqual([[10, 57, 90], [72, 44, 66], [91, 49, 23], [13, 33, 21]])
    FakeJest.expect(nd.array([C]).T().toRawArray()).toEqual([[1], [2], [3]])
    FakeJest.expect(nd.array([[4, 5, 3]]).T().dot([10]).toRawArray()).toEqual([40, 50, 30])


    console.log('\n\n-------- End Linear Algebra Suite --------\n\n')
}
