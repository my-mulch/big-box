
const {
    findPivot,
    swapRows,
    zeroOutColumn
} = require('./utils/rref-utils')

function rref(A) {
    const matrix = [...A]
    const shape = ndim.shape(matrix)
    const [rows, columns] = shape

    let lead = 0, pivotRow = 0
    for (let row = 0; row < rows; row++) {
        if (lead >= columns) return matrix;

        [pivotRow, lead] = findPivot(matrix, lead, row, shape)
        // after we've found pivot, swap that row into position
        pivotRow = swapRows(matrix, pivotRow, row)
        scale(pivotRow, 1 / pivotRow[lead])

        zeroOutColumn(matrix, lead, row, shape)
        lead++
    }

    return matrix;
}


function matrixProduct(A, B) {
    const [dim1, shared] = A.header.shape
    const [_, dim2] = B.header.shape
    const dotShape = [dim1, dim2]
    const result = ndim.empty(dotShape)

    for (let i = 0; i < dim1; i++)
        for (let j = 0; j < dim2; j++)
            for (let k = 0; k < shared; k++)
                result.set('+=', [A.slice(i, k) * B.slice(k, j)], i, j)

    return result
}


module.exports = {
    rref,
    matrixProduct
}
