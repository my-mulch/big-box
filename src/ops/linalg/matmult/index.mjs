import radley from 'radley'

import genericMethod from './generic'
import optimalMethod from './optimized'

export default radley.suite({
    generic: {
        criteria: 'args.result.header.size > 500',
        methods: genericMethod
    },
    optimized: {
        criteria: 'args.result.header.size <= 500',
        methods: optimalMethod
    },
    hash: ['args.of.header.id', 'args.with.header.id', 'args.result.header.id']
})
