import radley from 'radley'

import symbolic from './symbolic'
import optimized from './optimized'

export default radley.suite({
    argmax: {
        'args.of.header.size / args.result.header.size < 40': optimized.argmax,
        'args.of.header.size / args.result.header.size > 40': symbolic.argmax
    },
    argmin: {
        'args.of.header.size / args.result.header.size < 40': optimized.argmin,
        'args.of.header.size / args.result.header.size > 40': symbolic.argmin
    },
    min: {
        'args.of.header.size / args.result.header.size < 40': optimized.min,
        'args.of.header.size / args.result.header.size > 40': symbolic.min
    },
    max: {
        'args.of.header.size / args.result.header.size < 40': optimized.max,
        'args.of.header.size / args.result.header.size > 40': symbolic.max
    },
    mean: {
        'args.of.header.size / args.result.header.size < 40': optimized.mean,
        'args.of.header.size / args.result.header.size > 40': symbolic.mean
    },
    norm: {
        'args.of.header.size / args.result.header.size < 40': optimized.norm,
        'args.of.header.size / args.result.header.size > 40': symbolic.norm
    },
    prod: {
        'args.of.header.size / args.result.header.size < 40': optimized.prod,
        'args.of.header.size / args.result.header.size > 40': symbolic.prod
    },
    round: { 'true': symbolic.round },
    sum: {
        'args.of.header.size / args.result.header.size < 40': optimized.sum,
        'args.of.header.size / args.result.header.size > 40': symbolic.sum
    },
    cumsum: {
        'args.of.header.size / args.result.header.size < 40': optimized.cumsum,
        'args.of.header.size / args.result.header.size > 40': symbolic.cumsum
    },
    cumprod: {
        'args.of.header.size / args.result.header.size < 40': optimized.cumprod,
        'args.of.header.size / args.result.header.size > 40': symbolic.cumprod
    },
    hash: ['args.of.header.id', 'args.result.header.id']
})
