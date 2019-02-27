import radley from 'radley'

import symbolic from './symbolic'
import optimized from './optimized'

export default radley.suite({
    add: {
        'args.with.header.size <= 40': optimized.add,
        'args.with.header.size > 40': symbolic.add
    },
    subtract: {
        'args.with.header.size <= 40': optimized.subtract,
        'args.with.header.size > 40': symbolic.subtract
    },
    multiply: {
        'args.with.header.size <= 40': optimized.multiply,
        'args.with.header.size > 40': symbolic.multiply
    },
    divide: {
        'args.with.header.size <= 40': optimized.divide,
        'args.with.header.size > 40': symbolic.divide
    },
    hash: ['args.of.header.id', 'args.result.header.id']
})
