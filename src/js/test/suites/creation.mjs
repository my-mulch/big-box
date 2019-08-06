import nd from '../../main/array'
import jest from '../engine'

export default function () {
    let A, B

    console.log('\n\n-------- Creation Suite --------\n\n')

    A = nd.array({
        with: [
            [10, 72, 91, 13],
            [57, 44, 49, 33],
            [90, 66, 23, 21],
        ]
    })

    B = nd.array({
        with: [
            [1],
            [2],
            [3],
            [4]
        ]
    })

    jest.expect(A).toEqual([[10, 72, 91, 13], [57, 44, 49, 33], [90, 66, 23, 21]])
    jest.expect(B).toEqual([[1], [2], [3], [4]])
    jest.expect(A.shape).toEqual([3, 4])
    jest.expect(B.shape).toEqual([4, 1])

    jest.expect(A.strides).toEqual([8, 2])
    jest.expect(B.strides).toEqual([2, 2])

    jest.expect(B.reshape({ shape: [1, 4, 1] })).toEqual([[[1], [2], [3], [4]]])

    jest.expect(nd.zeros({ shape: [2, 3, 2] })).toEqual([
        [[0, 0], [0, 0], [0, 0]],
        [[0, 0], [0, 0], [0, 0]]
    ])

    jest.expect(nd.ones({ shape: [2, 3, 2] })).toEqual([
        [[1, 1], [1, 1], [1, 1]],
        [[1, 1], [1, 1], [1, 1]]
    ])

    jest.expect(nd.eye({ shape: [3, 3] })).toEqual([
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1]
    ])

    jest.expect(nd.eye({ shape: [3, 3, 3] })).toEqual([
        [[1, 0, 0], [0, 0, 0], [0, 0, 0]],
        [[0, 0, 0], [0, 1, 0], [0, 0, 0]],
        [[0, 0, 0], [0, 0, 0], [0, 0, 1]]
    ])

    jest.expect(nd.arange({ stop: 10 })).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
    jest.expect(nd.arange({ start: 2, stop: 10 })).toEqual([2, 3, 4, 5, 6, 7, 8, 9])
    jest.expect(nd.arange({ start: 5, stop: 11, step: 3 })).toEqual([5, 8])

    console.log('\n\n-------- End Creation Suite --------\n\n')
}
