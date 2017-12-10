
function findPivot(matrix, lead, row, shape) {
    const [numRows, numCols] = shape

    let i = row // starting position/row
    while (matrix[i][lead] === 0) {
        // while we do not have a pivot
        i++
        if (i >= numRows) {
            // if we run out of rows, reset
            i = row
            lead++
            if (lead >= numCols) return
        }
    }

    return [i, lead]
}

function swapRows(matrix, a, b) {
    const temp = matrix[a]
    matrix[a] = matrix[b]
    return matrix[b] = temp
}

function zeroOutColumn(matrix, lead, row, shape) {
    const [rows, columns] = shape

    for (let i = 0; i < rows; i++) {
        if (i === row) continue
        const eliminator = matrix[i][lead]
        for (let j = 0; j < columns; j++) {
            matrix[i][j] -= eliminator * matrix[row][j]
        }
    }
}

module.exports = {
    findPivot,
    swapRows,
    zeroOutColumn
}