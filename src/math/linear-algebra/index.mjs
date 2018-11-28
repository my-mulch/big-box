import utils from '../../top/utils'

export default class LinearAlgebraOperator {
    static matMult(A, B, result) {
        for (let i = 0; i < result.length; i++)
            /** Whoa.. more crazy shit. Yes, it's in the readme */
            result[i] +=
                A.read(
                    i % A.header.shape[1] * A.header.strides.global[1]
                    + Math.floor(i / B.header.shape[0] * B.header.shape[1]) * A.header.strides.global[0])
                * B.read(
                    i % B.header.shape[0] * B.header.strides.global[0]
                    + Math.floor(i / B.header.shape[0]) % B.header.shape[1] * B.header.strides.global[1])
    }


    static cross(A, B) {
        return new Float64Array([
            A.slice(1) * B.slice(2) - A.slice(2) * B.slice(1),
            A.slice(2) * B.slice(0) - A.slice(0) * B.slice(2),
            A.slice(0) * B.slice(1) - A.slice(1) * B.slice(0)
        ])
    }

    static identity(shape, result) {
        const diagonal = stride.reduce(sum)
        const numDiags = shape.reduce(min)

        for (let i = 0; i < numDiags; i += diagonal)
            result[i] = 1
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
