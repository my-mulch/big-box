import radley from 'radley'

import symbolic from './symbolic'
import flattened from './flattened'
import pointwise from './pointwise'

export default radley.suite({
    add: {
        'args.result.size <= 15': true,
        'args.result.size <= 30': true,
        'args.result.size > 30': true
    },
    subtract: {
        'args.result.size <= 15': true,
        'args.result.size <= 30': true,
        'args.result.size > 30': true
    },
    multiply: {
        'args.result.size <= 15': true,
        'args.result.size <= 30': true,
        'args.result.size > 30': true
    },
    divide: {
        'args.result.size <= 15': true,
        'args.result.size <= 30': true,
        'args.result.size > 30': true
    },
    assign: {
        'args.result.size <= 15': true,
        'args.result.size <= 30': true,
        'args.result.size > 30': true
    },
    min: {
        'args.result.size <= 15': true,
        'args.result.size <= 30': true,
        'args.result.size > 30': true
    },
    max: {
        'args.result.size <= 15': true,
        'args.result.size <= 30': true,
        'args.result.size > 30': true
    },
    mean: {
        'args.result.size <= 15': true,
        'args.result.size <= 30': true,
        'args.result.size > 30': true
    },
    norm: {
        'args.result.size <= 15': true,
        'args.result.size <= 30': true,
        'args.result.size > 30': true
    },
    sum: {
        'args.result.size <= 15': true,
        'args.result.size <= 30': true,
        'args.result.size > 30': true
    },
    hash: ['args.of.id', 'args.with.id', 'args.result.id']
})
