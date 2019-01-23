import radley from 'radley'

import generic from './generic'
import optimized from './optimized'

export default radley.suite({
    methods: { optimized, generic },
    router: function (args) {
        return this.suite[
            args.A.header.shape[0] << 2 | args.A.header.shape[1] << 4 | args.B.header.shape[1] << 6 |
            args.A.header.strides[0] << 8 | args.A.header.strides[1] << 10 | args.B.header.strides[1] << 12
        ]
    },
    tractable: function (args) {
        return args.A.header.shape[0] * args.A.header.shape[1] * args.B.header.shape[1] < 500
    }
})
