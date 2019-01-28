import nd from '../../array'

export default function (FakeJest) {
    let A, B

    console.log('\n\n-------- Creation Suite --------\n\n')

    A = nd.array({
        A: [
            [10, 72, 91, 13],
            [57, 44, 49, 33],
            [90, 66, 23, 21],
        ]
    })

    B = nd.array({
        A: [
            [1],
            [2],
            [3],
            [4]
        ]
    })

    FakeJest.expect(A).toEqual([[10, 72, 91, 13], [57, 44, 49, 33], [90, 66, 23, 21]])
    FakeJest.expect(B).toEqual([[1], [2], [3], [4]])

    FakeJest.expect(A.header.shape).toEqual([3, 4])
    FakeJest.expect(B.header.shape).toEqual([4, 1])

    FakeJest.expect(A.header.strides).toEqual([4, 1])
    FakeJest.expect(B.header.strides).toEqual([1, 1])

    FakeJest.expect(B.reshape({ shape: [1, 4, 1] })).toEqual([[[1], [2], [3], [4]]])

    FakeJest.expect(nd.zeros({ shape: [2, 3, 2] })).toEqual([[[0, 0], [0, 0], [0, 0]], [[0, 0], [0, 0], [0, 0]]])
    FakeJest.expect(nd.ones({ shape: [2, 3, 2] })).toEqual([[[1, 1], [1, 1], [1, 1]], [[1, 1], [1, 1], [1, 1]]])

    FakeJest.expect(nd.eye({ shape: [3, 3] })).toEqual([[1, 0, 0], [0, 1, 0], [0, 0, 1]])
    FakeJest.expect(nd.eye({ shape: [3, 3, 3] })).toEqual([
        [[1, 0, 0], [0, 0, 0], [0, 0, 0]],
        [[0, 0, 0], [0, 1, 0], [0, 0, 0]],
        [[0, 0, 0], [0, 0, 0], [0, 0, 1]]
    ])

    FakeJest.expect(nd.arange({ stop: 10 })).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
    FakeJest.expect(nd.arange({ start: 2, stop: 10 })).toEqual([2, 3, 4, 5, 6, 7, 8, 9])
    FakeJest.expect(nd.arange({ start: 5, stop: 11, step: 3 })).toEqual([5, 8])

    console.log('\n\n-------- End Creation Suite --------\n\n')
}