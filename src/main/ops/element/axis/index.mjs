import radley from 'radley'

import symbolic from './symbolic'
import optimized from './optimized'

export default radley.suite({
    min: {
        'args.of.size / args.result.size <= 30': optimized.min,
        'args.of.size / args.result.size > 30': symbolic.min
    },
    max: {
        'args.of.size / args.result.size <= 30': optimized.max,
        'args.of.size / args.result.size > 30': symbolic.max
    },
    mean: {
        'args.of.size / args.result.size <= 30': optimized.mean,
        'args.of.size / args.result.size > 30': symbolic.mean
    },
    norm: {
        'args.of.size / args.result.size <= 15': optimized.norm,
        'args.of.size / args.result.size > 15': symbolic.norm
    },
    sum: {
        'args.of.size / args.result.size <= 30': optimized.sum,
        'args.of.size / args.result.size > 30': symbolic.sum
    },
    hash: ['args.of.id', 'args.result.id']
})
