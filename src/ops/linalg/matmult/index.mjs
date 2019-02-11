import radley from 'radley'

import generic from './generic'
import optimized from './optimized'

export default radley.suite({
    methods: { optimized, generic },
    router: function (args) {
        return this.suite[args.of.header.shape.length]
    },
    tractable: function (args) {
        return args.of.header.shape[0] * args.of.header.shape[1] * args.with.header.shape[1] < 500
    }
})
