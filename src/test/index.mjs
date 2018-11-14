import nd from '../array'
import FakeJest from './fakejest'

/* Creation Tests */

let A, B, C

console.log('\n\n-------- Creation Suite --------\n\n')

A = nd.array([
    [10, 72, 91, 13],
    [57, 44, 49, 33],
    [90, 66, 23, 21],
])

B = nd.array([1, 2, 3, 4])
C = nd.random.randint(0, 10, [4, 3, 5])

FakeJest.expect(A.toRawArray()).equals([[10, 72, 91, 13], [57, 44, 49, 33], [90, 66, 23, 21]])
FakeJest.expect(B.toRawArray()).equals([1, 2, 3, 4])

FakeJest.expect(A.header.shape).equals([3, 4])
FakeJest.expect(B.header.shape).equals([4])
FakeJest.expect(C.header.shape).equals([4, 3, 5])

FakeJest.expect(A.header.stride).equals([4, 1])
FakeJest.expect(B.header.stride).equals([1])
FakeJest.expect(C.header.stride).equals([15, 5, 1])

FakeJest.expect(nd.array([B]).toRawArray()).equals([[1, 2, 3, 4]])
FakeJest.expect(nd.array([C, C]).header.shape).equals([2, 4, 3, 5])

FakeJest.expect(nd.zeros(2, 3, 2).toRawArray()).equals([[[0, 0], [0, 0], [0, 0]], [[0, 0], [0, 0], [0, 0]]])
FakeJest.expect(nd.ones(2, 3, 2).toRawArray()).equals([[[1, 1], [1, 1], [1, 1]], [[1, 1], [1, 1], [1, 1]]])

FakeJest.expect(nd.eye(3, 3).toRawArray()).equals([[1, 0, 0], [0, 1, 0], [0, 0, 1]])
FakeJest.expect(nd.eye(3, 3, 3).toRawArray()).equals([
    [[1, 0, 0], [0, 0, 0], [0, 0, 0]],
    [[0, 0, 0], [0, 1, 0], [0, 0, 0]],
    [[0, 0, 0], [0, 0, 0], [0, 0, 1]]
])

FakeJest.expect(nd.arange(10).toRawArray()).equals([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
FakeJest.expect(nd.arange(2, 10).toRawArray()).equals([2, 3, 4, 5, 6, 7, 8, 9])
FakeJest.expect(nd.arange(5, 11, 3).toRawArray()).equals([5, 8])

console.log('\n\n-------- End Creation Suite --------\n\n')
