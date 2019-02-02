import nd from '../../array'
import jest from '../engine'

export default function () {
    let A, B

    console.log('\n\n-------- Indexing Suite --------\n\n')

    A = nd.array({
        from: [
            [[10, 5, 2], [72, 6, 3], [91, 6, 1], [13, 4, 12]],
            [[57, 7, 1], [44, 2, 2], [49, 8, 4], [33, 8, 5]],
            [[90, 2, 5], [66, 4, 3], [23, 1, 2], [21, 2, 2]],
        ]
    })

    console.log(A.slice({}))
    // jest.expect(A).toEqual([[10, 72, 91, 13], [57, 44, 49, 33], [90, 66, 23, 21]])

    console.log('\n\n-------- End Indexing Suite --------\n\n')
}