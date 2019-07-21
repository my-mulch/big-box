import radley from 'radley'

import symbolic from './symbolic'
import optimized from './optimized'

export default radley.suite({
    min: {
        'args.of.size / args.result.size <= 40': optimized.min,
        'args.of.size / args.result.size > 40': symbolic.min
    },
    max: {
        'args.of.size / args.result.size <= 40': optimized.max,
        'args.of.size / args.result.size > 40': symbolic.max
    },
    mean: {
        'args.of.size / args.result.size <= 40': optimized.mean,
        'args.of.size / args.result.size > 40': symbolic.mean
    },
    norm: {
        'args.of.size / args.result.size <= 15': optimized.norm,
        'args.of.size / args.result.size > 15': symbolic.norm
    },
    sum: {
        'args.of.size / args.result.size <= 40': optimized.sum,
        'args.of.size / args.result.size > 40': symbolic.sum
    },
    hash: ['args.of.id', 'args.result.id']
})
