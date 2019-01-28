import radley from 'radley'

import generic from './generic'
import optimized from './optimized'

export default radley.suite({
    methods: { optimized, generic },
    router: function (args) {
        return this.suite[
            args.of.header.shape[0] << 2 | args.of.header.shape[1] << 4 | args.against.header.shape[1] << 6 |
            args.of.header.strides[0] << 8 | args.of.header.strides[1] << 10 | args.against.header.strides[1] << 12
        ]
    },
    tractable: function (args) {
        return args.of.header.shape[0] * args.of.header.shape[1] * args.against.header.shape[1] < 500
    }
})
