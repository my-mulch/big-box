import symbolic from './compute/symbolic'
import flattened from './compute/flattened'
import pointwise from './compute/pointwise'

import {
    cache, // axis cache
    min, max, mean, norm, sum, // axis ops
    addition, subtraction, multiplication, division, assignment, // pair ops
} from './compute/operations'

export default {
    utils: {},
    operations: {
        add: {
            'args.result.size <= 15': pointwise({ operation: addition, cache }),
            'args.result.size <= 30': flattened({ operation: addition, cache }),
            'args.result.size > 30': symbolic({ operation: addition, cache })
        },
        subtract: {
            'args.result.size <= 15': pointwise({ operation: subtraction, cache }),
            'args.result.size <= 30': flattened({ operation: subtraction, cache }),
            'args.result.size > 30': symbolic({ operation: subtraction, cache })
        },
        multiply: {
            'args.result.size <= 15': pointwise({ operation: multiplication, cache }),
            'args.result.size <= 30': flattened({ operation: multiplication, cache }),
            'args.result.size > 30': symbolic({ operation: multiplication, cache })
        },
        divide: {
            'args.result.size <= 15': pointwise({ operation: division, cache }),
            'args.result.size <= 30': flattened({ operation: division, cache }),
            'args.result.size > 30': symbolic({ operation: division, cache })
        },
        assign: {
            'args.result.size <= 15': pointwise({ operation: assignment, cache }),
            'args.result.size <= 30': flattened({ operation: assignment, cache }),
            'args.result.size > 30': symbolic({ operation: assignment, cache })
        },
        min: {
            'args.result.size <= 15': pointwise({ operation: min, cache }),
            'args.result.size <= 30': flattened({ operation: min, cache }),
            'args.result.size > 30': symbolic({ operation: min, cache }),
        },
        max: {
            'args.result.size <= 15': pointwise({ operation: max, cache }),
            'args.result.size <= 30': flattened({ operation: max, cache }),
            'args.result.size > 30': symbolic({ operation: max, cache }),
        },
        mean: {
            'args.result.size <= 15': pointwise({ operation: mean, cache }),
            'args.result.size <= 30': flattened({ operation: mean, cache }),
            'args.result.size > 30': symbolic({ operation: mean, cache }),
        },
        norm: {
            'args.result.size <= 15': pointwise({ operation: norm, cache }),
            'args.result.size <= 30': flattened({ operation: norm, cache }),
            'args.result.size > 30': symbolic({ operation: norm, cache }),
        },
        sum: {
            'args.result.size <= 15': pointwise({ operation: sum, cache }),
            'args.result.size <= 30': flattened({ operation: sum, cache }),
            'args.result.size > 30': symbolic({ operation: sum, cache }),
        }
    }

}
