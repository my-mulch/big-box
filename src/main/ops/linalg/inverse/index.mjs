import radley from 'radley'

import symbolic from './symbolic'
import optimized from './optimized'

export default radley.suite({
    default: {
        'args.result.header.size > 25': symbolic,
        'args.result.header.size <= 25': optimized
    },
    hash: ['args.of.header.id', 'args.result.header.id']
})
