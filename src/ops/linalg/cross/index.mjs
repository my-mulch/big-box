import radley from 'radley'

import optimalMethod from './optimized'

export default radley.suite({
    optimized: {
        criteria: 'true',
        methods: optimalMethod
    },
    hash: ['args.of.header.id', 'args.with.header.id', 'args.result.header.id']
})
