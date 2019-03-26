import radley from 'radley'

import symbolic from './symbolic/template'
import optimized from './optimized/template'

import PairSuiteFactory from './factory'

export default radley.suite({
    add: {
        'args.with.size <= 40': PairSuiteFactory.call(null, '+', optimized),
        'args.with.size > 40': PairSuiteFactory.call(null, '+', symbolic)
    },
    subtract: {
        'args.with.size <= 40': PairSuiteFactory.call(null, '-', optimized),
        'args.with.size > 40': PairSuiteFactory.call(null, '-', symbolic)
    },
    multiply: {
        'args.with.size <= 40': PairSuiteFactory.call(null, '*', optimized),
        'args.with.size > 40': PairSuiteFactory.call(null, '*', symbolic)
    },
    divide: {
        'args.with.size <= 40': PairSuiteFactory.call(null, '/', optimized),
        'args.with.size > 40': PairSuiteFactory.call(null, '/', symbolic)
    },
    assign: {
        'args.with.size <= 40': PairSuiteFactory.call(null, '=', optimized),
        'args.with.size > 40': PairSuiteFactory.call(null, '=', symbolic)
    },
    hash: ['args.of.id', 'args.with.id', 'args.result.id']
})
