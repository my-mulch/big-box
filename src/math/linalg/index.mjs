import utils from '../../top/utils'

export default class LinearAlgebraOperator {
    static matMult(A, B) {
        return new Float64Array(utils.linalg.matrixSize(A, B))
            .map(utils.linalg.matrixProduct(A, B))
    }

    static invert(A, I) {
        return new Float64Array(A.header.size)
            .map(utils.linalg.matrixInverse(A, I))
    }

    static cross(A, B) {
        return new Float64Array([
            A.slice(1) * B.slice(2) - A.slice(2) * B.slice(1),
            A.slice(2) * B.slice(0) - A.slice(0) * B.slice(2),
            A.slice(0) * B.slice(1) - A.slice(1) * B.slice(0)
        ])
    }
}
