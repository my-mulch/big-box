import radley from 'radley'

import genericMethods from './generic'
import optimalMethods from './optimized'

export default radley.suite({
    generic: {
        criteria: 'args.result.header.size > 500',
        methods: genericMethods
    },
    optimized: {
        criteria: 'args.result.header.size <= 500',
        methods: optimalMethods
    },
    hash: ['args.of.header.id', 'args.with.header.id', 'args.result.header.id']
})
