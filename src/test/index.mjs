import nd from '../array'
import FakeJest from './fakejest'

/* Creation Tests */

let A, B

A = nd.array([
    [10, 72, 91, 13],
    [57, 44, 49, 33],
    [90, 66, 23, 21],
])

B = nd.array([1, 2, 3, 4])

console.log('\n\nCreation tests:\n\n')

FakeJest.expect(A.toRawArray()).equals([[10, 72, 91, 13], [57, 44, 49, 33], [90, 66, 23, 21]])
FakeJest.expect(B.toRawArray()).equals([1, 2, 3, 4])

FakeJest.expect(A.header.shape).equals([3, 4])
FakeJest.expect(B.header.shape).equals([4])

FakeJest.expect(A.header.stride).equals([4, 1])
FakeJest.expect(B.header.stride).equals([1])






