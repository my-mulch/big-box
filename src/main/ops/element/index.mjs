import symbolic from './compute/symbolic'
import flattened from './compute/flattened'
import pointwise from './compute/pointwise'

import { addition, subtraction, multiplication, division, assignment } from './compute/operations'

export default {
    utils: {},
    operations: {
        add: {
            'args.result.size <= 15': pointwise(addition),
            'args.result.size <= 30': flattened(addition),
            'args.result.size > 30': symbolic(addition)
        },
        subtract: {
            'args.result.size <= 15': pointwise(subtraction),
            'args.result.size <= 30': flattened(subtraction),
            'args.result.size > 30': symbolic(subtraction)
        },
        multiply: {
            'args.result.size <= 15': pointwise(multiplication),
            'args.result.size <= 30': flattened(multiplication),
            'args.result.size > 30': symbolic(multiplication)
        },
        divide: {
            'args.result.size <= 15': pointwise(division),
            'args.result.size <= 30': flattened(division),
            'args.result.size > 30': symbolic(division)
        },
        assign: {
            'args.result.size <= 15': pointwise(assignment),
            'args.result.size <= 30': flattened(assignment),
            'args.result.size > 30': symbolic(assignment)
        },
        min: {
            'args.result.size <= 15': function () { return function () { } },
            'args.result.size <= 30': function () { return function () { } },
            'args.result.size > 30': function () { return function () { } }
        },
        max: {
            'args.result.size <= 15': function () { return function () { } },
            'args.result.size <= 30': function () { return function () { } },
            'args.result.size > 30': function () { return function () { } }
        },
        mean: {
            'args.result.size <= 15': function () { return function () { } },
            'args.result.size <= 30': function () { return function () { } },
            'args.result.size > 30': function () { return function () { } }
        },
        norm: {
            'args.result.size <= 15': function () { return function () { } },
            'args.result.size <= 30': function () { return function () { } },
            'args.result.size > 30': function () { return function () { } }
        },
        sum: {
            'args.result.size <= 15': function () { return function () { } },
            'args.result.size <= 30': function () { return function () { } },
            'args.result.size > 30': function () { return function () { } }
        }
    }

}
