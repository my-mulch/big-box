import radley from 'radley'

import symbolic from './symbolic'
import optimized from './optimized'

export default radley.suite({
    default: {
        'args.result.size > 25': symbolic,
        'args.result.size <= 25': optimized
    },
    hash: ['args.of.id', 'args.result.id']
})
