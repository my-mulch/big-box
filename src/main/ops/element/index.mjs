import symbolic from './templates/symbolic'
import flattened from './templates/flattened'
import pointwise from './templates/pointwise'

import {
    min, max, mean, norm, sum, // axis ops
    addition, subtraction, multiplication, division, assignment, // pair ops
} from './templates/operations'

export default {
    utils: {},
    operations: {
        add: {
            'args.size <= 20': pointwise(addition),
            'args.size <= 100': flattened(addition),
            'args.size > 100': symbolic(addition)
        },
        subtract: {
            'args.size <= 20': pointwise(subtraction),
            'args.size <= 100': flattened(subtraction),
            'args.size > 100': symbolic(subtraction)
        },
        multiply: {
            'args.size <= 20': pointwise(multiplication),
            'args.size <= 100': flattened(multiplication),
            'args.size > 100': symbolic(multiplication)
        },
        divide: {
            'args.size <= 20': pointwise(division),
            'args.size <= 100': flattened(division),
            'args.size > 100': symbolic(division)
        },
        assign: {
            'args.size <= 20': pointwise(assignment),
            'args.size <= 100': flattened(assignment),
            'args.size > 100': symbolic(assignment)
        },
        min: {
            'args.size <= 20': pointwise(min),
            'args.size <= 100': flattened(min),
            'args.size > 100': symbolic(min),
        },
        max: {
            'args.size <= 20': pointwise(max),
            'args.size <= 100': flattened(max),
            'args.size > 100': symbolic(max),
        },
        mean: {
            'args.size <= 20': pointwise(mean),
            'args.size <= 100': flattened(mean),
            'args.size > 100': symbolic(mean),
        },
        norm: {
            'args.size <= 20': pointwise(norm),
            'args.size <= 100': flattened(norm),
            'args.size > 100': symbolic(norm),
        },
        sum: {
            'args.size <= 20': pointwise(sum),
            'args.size <= 100': flattened(sum),
            'args.size > 100': symbolic(sum),
        }
    }

}
