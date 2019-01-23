import nd from '../../array'
import { matMultSuite } from '../../ops/linalg'

export default function (FakeJest) {
    let A, B, C, A1, B1, C1

    console.log('\n\n-------- Creation Suite --------\n\n')

    A = nd.array([
        [10, 72, 91, 13],
        [57, 44, 49, 33],
        [90, 66, 23, 21],
    ])

    B = nd.array([
        [1],
        [2],
        [3],
        [4]
    ])

    C = nd.array([0, 0, 0])


    function anonymous({ A, B, R }) {
        R.data[0] = A.data[A.header.offset + 0] * B.data[B.header.offset + 0] + A.data[A.header.offset + 1] * B.data[B.header.offset + 1] + A.data[A.header.offset + 2] * B.data[B.header.offset + 2] + A.data[A.header.offset + 3] * B.data[B.header.offset + 3]
        R.data[1] = A.data[A.header.offset + 4] * B.data[B.header.offset + 0] + A.data[A.header.offset + 5] * B.data[B.header.offset + 1] + A.data[A.header.offset + 6] * B.data[B.header.offset + 2] + A.data[A.header.offset + 7] * B.data[B.header.offset + 3]
        R.data[2] = A.data[A.header.offset + 8] * B.data[B.header.offset + 0] + A.data[A.header.offset + 9] * B.data[B.header.offset + 1] + A.data[A.header.offset + 10] * B.data[B.header.offset + 2] + A.data[A.header.offset + 11] * B.data[B.header.offset + 3]
        return R
    }


    console.time('fast')
    for (let i = 0; i < 1e7; i++)
        A.dot(B, C)
    console.timeEnd('fast')


    console.time('slow')
    for (let i = 0; i < 1e7; i++)
        anonymous({ A, B, R: C })
    console.timeEnd('slow')
    // console.log()
    // FakeJest.expect(A).toEqual([[10, 72, 91, 13], [57, 44, 49, 33], [90, 66, 23, 21]])
    // FakeJest.expect(B).toEqual([1, 2, 3, 4])

    // FakeJest.expect(A.header.shape).toEqual([3, 4])
    // FakeJest.expect(B.header.shape).toEqual([4])
    // FakeJest.expect(C.header.shape).toEqual([4, 3, 5])

    // FakeJest.expect(A.header.stride).toEqual([4, 1])
    // FakeJest.expect(B.header.stride).toEqual([1])
    // FakeJest.expect(C.header.stride).toEqual([15, 5, 1])

    // FakeJest.expect(nd.array([B])).toEqual([[1, 2, 3, 4]])
    // FakeJest.expect(nd.array([C, C]).header.shape).toEqual([2, 4, 3, 5])

    // FakeJest.expect(nd.zeros(2, 3, 2)).toEqual([[[0, 0], [0, 0], [0, 0]], [[0, 0], [0, 0], [0, 0]]])
    // FakeJest.expect(nd.ones(2, 3, 2)).toEqual([[[1, 1], [1, 1], [1, 1]], [[1, 1], [1, 1], [1, 1]]])

    // FakeJest.expect(nd.eye(3, 3)).toEqual([[1, 0, 0], [0, 1, 0], [0, 0, 1]])
    // FakeJest.expect(nd.eye(3, 3, 3)).toEqual([
    //     [[1, 0, 0], [0, 0, 0], [0, 0, 0]],
    //     [[0, 0, 0], [0, 1, 0], [0, 0, 0]],
    //     [[0, 0, 0], [0, 0, 0], [0, 0, 1]]
    // ])

    // FakeJest.expect(nd.arange(10)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
    // FakeJest.expect(nd.arange(2, 10)).toEqual([2, 3, 4, 5, 6, 7, 8, 9])
    // FakeJest.expect(nd.arange(5, 11, 3)).toEqual([5, 8])

    // FakeJest.expect(B.copy().data).toNotEqualByReference(B.data)
    // FakeJest.expect(B.copy()).toEqual(B)

    console.log('\n\n-------- End Creation Suite --------\n\n')
}