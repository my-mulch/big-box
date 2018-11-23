import utils from '../../top/utils'

export default class LinearAlgebraOperator {
    static matMult(A, B) {
        return new Float64Array(utils.linalg.matrixSize(A, B))
            .map(utils.linalg.matrixProduct(A, B))
    }

    static cross(A, B) {
        return new Float64Array([
            A.slice(1) * B.slice(2) - A.slice(2) * B.slice(1),
            A.slice(2) * B.slice(0) - A.slice(0) * B.slice(2),
            A.slice(0) * B.slice(1) - A.slice(1) * B.slice(0)
        ])
    }

    static invert(A, I) {
        A = A.copy()

        for (let pivotRow = 0; pivotRow < A.header.shape[0]; pivotRow++) {
            const newPivotRow = utils.linalg.seekPivotRow(A, pivotRow)

            if (newPivotRow !== pivotRow) {
                utils.linalg.swapRows(A, pivotRow, newPivotRow)
                utils.linalg.swapRows(I, pivotRow, newPivotRow)
            }

            const pivot = A.slice(pivotRow, pivotRow)
            const pivotRowI = I.slice(pivotRow)
            const pivotRowA = A.slice(pivotRow)

            A.set(pivotRow).to(pivotRowA.divide(pivot))
            I.set(pivotRow).to(pivotRowI.divide(pivot))

            for (let row = 0; row < A.header.shape[0]; row++) {
                if (row === pivotRow) continue

                const knockout = A.slice(row, pivotRow) // pivotRow is also pivotCol, square Matrix
                const knockoutRowI = I.slice(row)
                const knockoutRowA = A.slice(row)

                A.set(row).to(knockoutRowA.subtract(pivotRowA.multiply(knockout)))
                I.set(row).to(knockoutRowI.subtract(pivotRowI.multiply(knockout)))
            }
        }

        return I
    }

}
