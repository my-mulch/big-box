import radley from 'radley'

import genericMethod from './generic'
import optimalMethod from './optimized'

export default radley.suite({
    generic: {
        criteria: 'args.result.header.size > 25',
        methods: genericMethod
    },
    optimized: {
        criteria: 'args.result.header.size <= 25',
        methods: optimalMethod
    },
    hash: ['args.of.header.id', 'args.result.header.id']
})
