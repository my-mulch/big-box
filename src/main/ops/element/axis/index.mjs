import radley from 'radley'

import symbolic from './symbolic'
import optimized from './optimized'

export default radley.suite({
    argmax: {
        'args.of.size / args.result.size <= 40': optimized.argmax,
        'args.of.size / args.result.size > 40': symbolic.argmax
    },
    argmin: {
        'args.of.size / args.result.size <= 40': optimized.argmin,
        'args.of.size / args.result.size > 40': symbolic.argmin
    },
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
    prod: {
        'args.of.size / args.result.size <= 40': optimized.prod,
        'args.of.size / args.result.size > 40': symbolic.prod
    },
    round: {
        'true': symbolic.round
    },
    sum: {
        'args.of.size / args.result.size <= 40': optimized.sum,
        'args.of.size / args.result.size > 40': symbolic.sum
    },
    cumsum: {
        'args.of.size / args.result.size <= 40': optimized.cumsum,
        'args.of.size / args.result.size > 40': symbolic.cumsum
    },
    cumprod: {
        'args.of.size / args.result.size <= 40': optimized.cumprod,
        'args.of.size / args.result.size > 40': symbolic.cumprod
    },
    hash: ['args.of.id', 'args.result.id']
})
