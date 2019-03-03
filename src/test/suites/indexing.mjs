import nd from '../../main/array'
import jest from '../engine'

export default function () {
    let A

    console.log('\n\n-------- Indexing Suite --------\n\n')

    A = nd.array({
        from: [[[10, 5, 2],
        [72, 6, 3],
        [91, 6, 1],
        [13, 4, 12]],

        [[57, 7, 1],
        [44, 2, 2],
        [49, 8, 4],
        [33, 8, 5]],

        [[90, 2, 5],
        [66, 4, 3],
        [23, 1, 2],
        [21, 2, 2]]]
    })

    jest.expect(A.slice({ indices: [0, 0, 0] })).toEqual(10)

    jest.expect(A.slice({ indices: [':', 0, ':'] }))
        .toEqual([
            [10, 5, 2],
            [57, 7, 1],
            [90, 2, 5]
        ])

    jest.expect(A.slice({ indices: [':', 0, ':'] }).T())
        .toEqual([
            [10, 57, 90],
            [5, 7, 2],
            [2, 1, 5]])

    jest.expect(A.slice({ indices: [1, ':3', ':'] }))
        .toEqual([
            [57, 7, 1],
            [44, 2, 2],
            [49, 8, 4]
        ])

    jest.expect(A.slice({ indices: [':', 0, ':'] })
        .set({ to: 1 }))
        .toEqual([
            [1, 1, 1],
            [1, 1, 1],
            [1, 1, 1]])

    jest.expect(A)
        .toEqual([
            [[1, 1, 1],
            [72, 6, 3],
            [91, 6, 1],
            [13, 4, 12]],

            [[1, 1, 1],
            [44, 2, 2],
            [49, 8, 4],
            [33, 8, 5]],

            [[1, 1, 1],
            [66, 4, 3],
            [23, 1, 2],
            [21, 2, 2]]])

    jest.expect(A.slice({ indices: [':', 0, ':'] })
        .set({
            to: [-0.02, 0.013, 0.005]
        }))
        .toEqual([
            [-0.02, 0.013, 0.005],
            [-0.02, 0.013, 0.005],
            [-0.02, 0.013, 0.005]
        ])

    jest.expect(A)
        .toEqual([
            [[-0.02, 0.013, 0.005],
            [72, 6, 3],
            [91, 6, 1],
            [13, 4, 12]],

            [[-0.02, 0.013, 0.005],
            [44, 2, 2],
            [49, 8, 4],
            [33, 8, 5]],

            [[-0.02, 0.013, 0.005],
            [66, 4, 3],
            [23, 1, 2],
            [21, 2, 2]]])




    console.log('\n\n-------- End Indexing Suite --------\n\n')
}