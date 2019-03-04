import radley from 'radley'

import symbolic from './symbolic/template'
import optimized from './optimized/template'

import PairSuiteFactory from './factory'

export default radley.suite({
    add: {
        'args.with.header.size <= 40': PairSuiteFactory.call(null, '+', optimized),
        'args.with.header.size > 40': PairSuiteFactory.call(null, '+', symbolic)
    },
    subtract: {
        'args.with.header.size <= 40': PairSuiteFactory.call(null, '-', optimized),
        'args.with.header.size > 40': PairSuiteFactory.call(null, '-', symbolic)
    },
    multiply: {
        'args.with.header.size <= 40': PairSuiteFactory.call(null, '*', optimized),
        'args.with.header.size > 40': PairSuiteFactory.call(null, '*', symbolic)
    },
    divide: {
        'args.with.header.size <= 40': PairSuiteFactory.call(null, '/', optimized),
        'args.with.header.size > 40': PairSuiteFactory.call(null, '/', symbolic)
    },
    assign: {
        'args.with.header.size <= 40': PairSuiteFactory.call(null, '=', optimized),
        'args.with.header.size > 40': PairSuiteFactory.call(null, '=', symbolic)
    },
    hash: ['args.of.header.id', 'args.with.header.id', 'args.result.header.id']
})
