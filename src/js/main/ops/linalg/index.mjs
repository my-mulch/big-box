import cross from './cross'
import inverse from './inverse'
import matMult from './matmult'

export default {
    utils: {},
    operations: {
        ...cross,
        ...inverse,
        ...matMult
    }
}
