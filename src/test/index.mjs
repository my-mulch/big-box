import nd from '../array'
import FakeJest from './fakejest'

/* Creation Tests */

let A, B, C

A = nd.array([
    [10, 72, 91, 13],
    [57, 44, 49, 33],
    [90, 66, 23, 21],
])

B = nd.array([1, 2, 3, 4])
C = nd.random.randint(0, 10, [4, 3, 6, 5])

console.log('\n\nCreation tests:\n\n')

FakeJest.expect(A.toRawArray()).equals([[10, 72, 91, 13], [57, 44, 49, 33], [90, 66, 23, 21]])
FakeJest.expect(B.toRawArray()).equals([1, 2, 3, 4])

FakeJest.expect(A.header.shape).equals([3, 4])
FakeJest.expect(B.header.shape).equals([4])
FakeJest.expect(C.header.shape).equals([4, 3, 6, 5])

FakeJest.expect(A.header.stride).equals([4, 1])
FakeJest.expect(B.header.stride).equals([1])
FakeJest.expect(C.header.stride).equals([90, 30, 5, 1])

FakeJest.expect(nd.array([B]).toRawArray()).equals([[1, 2, 3, 4]])




