import radley from 'radley'

import generic from './generic'
import optimized from './optimized'

export default radley.suite({
    methods: { optimized, generic },
    tractable: function (args) { return args.A.data.length > 500 },
    router: function (args) {
        return this.suite[args.A.header.shape.length]
    },
})

