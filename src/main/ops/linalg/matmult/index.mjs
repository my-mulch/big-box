import radley from 'radley'

import symbolic from './symbolic'
import optimized from './optimized'

export default radley.suite({
    default: {
        'args.result.size > 500': symbolic,
        'args.result.size <= 500': optimized,
    },
    hash: ['args.of.id', 'args.with.id', 'args.result.id']
})
