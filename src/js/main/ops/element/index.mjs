import symbolic from './templates/symbolic'
import flattened from './templates/flattened'
import pointwise from './templates/pointwise'

import {
    min, max, mean, norm, sum, // axis ops
    addition, subtraction, multiplication, division, assignment, // pair ops
} from '../../ops'

export default {
    utils: {},
    operations: {
        add: {
            'args.meta.axesSize <= 20': pointwise(addition),
            'args.meta.axesSize <= 100': flattened(addition),
            'args.meta.axesSize > 100': symbolic(addition)
        },
        subtract: {
            'args.meta.axesSize <= 20': pointwise(subtraction),
            'args.meta.axesSize <= 100': flattened(subtraction),
            'args.meta.axesSize > 100': symbolic(subtraction)
        },
        multiply: {
            'args.meta.axesSize <= 20': pointwise(multiplication),
            'args.meta.axesSize <= 100': flattened(multiplication),
            'args.meta.axesSize > 100': symbolic(multiplication)
        },
        divide: {
            'args.meta.axesSize <= 20': pointwise(division),
            'args.meta.axesSize <= 100': flattened(division),
            'args.meta.axesSize > 100': symbolic(division)
        },
        assign: {
            'args.meta.axesSize <= 20': pointwise(assignment),
            'args.meta.axesSize <= 100': flattened(assignment),
            'args.meta.axesSize > 100': symbolic(assignment)
        },
        min: {
            'args.meta.axesSize <= 20': pointwise(min),
            'args.meta.axesSize <= 100': flattened(min),
            'args.meta.axesSize > 100': symbolic(min),
        },
        max: {
            'args.meta.axesSize <= 20': pointwise(max),
            'args.meta.axesSize <= 100': flattened(max),
            'args.meta.axesSize > 100': symbolic(max),
        },
        mean: {
            'args.meta.axesSize <= 20': pointwise(mean),
            'args.meta.axesSize <= 100': flattened(mean),
            'args.meta.axesSize > 100': symbolic(mean),
        },
        norm: {
            'args.meta.axesSize <= 20': pointwise(norm),
            'args.meta.axesSize <= 100': flattened(norm),
            'args.meta.axesSize > 100': symbolic(norm),
        },
        sum: {
            'args.meta.axesSize <= 20': pointwise(sum),
            'args.meta.axesSize <= 100': flattened(sum),
            'args.meta.axesSize > 100': symbolic(sum),
        }
    }

}
