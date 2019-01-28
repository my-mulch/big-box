import radley from 'radley'

import generic from './generic'
import optimized from './optimized'

export default radley.suite({
    methods: { optimized, generic },
    router: function (args) { return this.suite[args.of.data.length] },
    tractable: function (args) { return args.of.data.length <= 25 }
})
