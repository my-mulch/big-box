import radley from 'radley'

import symbolic from './symbolic'
import optimized from './optimized'

export default radley.suite({
    default: {
        'args.result.header.size > 500': symbolic,
        'args.result.header.size <= 500': optimized,
    },
    hash: ['args.of.header.id', 'args.with.header.id', 'args.result.header.id']
})
