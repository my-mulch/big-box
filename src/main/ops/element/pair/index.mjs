import radley from 'radley'

import symbolic from './symbolic/template'
import optimized from './optimized/template'

import { factory, add, sub, mul, div, assign } from './operations'

export default radley.suite({
    add: {
        'args.with.size <= 40': factory(optimized, add),
        'args.with.size > 40': factory(symbolic, add)
    },
    subtract: {
        'args.with.size <= 40': factory(optimized, sub),
        'args.with.size > 40': factory(symbolic, sub)
    },
    multiply: {
        'args.with.size <= 40': factory(optimized, mul),
        'args.with.size > 40': factory(symbolic, mul)
    },
    divide: {
        'args.with.size <= 40': factory(optimized, div),
        'args.with.size > 40': factory(symbolic, div)
    },
    assign: {
        'args.with.size <= 40': factory(optimized, assign),
        'args.with.size > 40': factory(symbolic, assign)
    },
    hash: ['args.of.id', 'args.with.id', 'args.result.id']
})
