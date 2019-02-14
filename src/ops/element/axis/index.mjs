import radley from 'radley'

import generic from './generic'
import optimized from './optimized'

export default radley.suite({
    methods: { generic, optimized },
    tractable: function (args) { return false /** Stub until optimized is written */ },
    router: function (args) {
        return this.suite[args.of.header.id][args.result.header.id]
    }
})


