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
            'args.size <= 20': pointwise({ operation: addition, cache }),
            'args.size <= 100': flattened({ operation: addition, cache }),
            'args.size > 100': symbolic({ operation: addition, cache })
        },
        subtract: {
            'args.size <= 20': pointwise({ operation: subtraction, cache }),
            'args.size <= 100': flattened({ operation: subtraction, cache }),
            'args.size > 100': symbolic({ operation: subtraction, cache })
        },
        multiply: {
            'args.size <= 20': pointwise({ operation: multiplication, cache }),
            'args.size <= 100': flattened({ operation: multiplication, cache }),
            'args.size > 100': symbolic({ operation: multiplication, cache })
        },
        divide: {
            'args.size <= 20': pointwise({ operation: division, cache }),
            'args.size <= 100': flattened({ operation: division, cache }),
            'args.size > 100': symbolic({ operation: division, cache })
        },
        assign: {
            'args.size <= 20': pointwise({ operation: assignment, cache }),
            'args.size <= 100': flattened({ operation: assignment, cache }),
            'args.size > 100': symbolic({ operation: assignment, cache })
        },
        min: {
            'args.size <= 20': pointwise({ operation: min, cache }),
            'args.size <= 100': flattened({ operation: min, cache }),
            'args.size > 100': symbolic({ operation: min, cache }),
        },
        max: {
            'args.size <= 20': pointwise({ operation: max, cache }),
            'args.size <= 100': flattened({ operation: max, cache }),
            'args.size > 100': symbolic({ operation: max, cache }),
        },
        mean: {
            'args.size <= 20': pointwise({ operation: mean, cache }),
            'args.size <= 100': flattened({ operation: mean, cache }),
            'args.size > 100': symbolic({ operation: mean, cache }),
        },
        norm: {
            'args.size <= 20': pointwise({ operation: norm, cache }),
            'args.size <= 100': flattened({ operation: norm, cache }),
            'args.size > 100': symbolic({ operation: norm, cache }),
        },
        sum: {
            'args.size <= 20': pointwise({ operation: sum, cache }),
            'args.size <= 100': flattened({ operation: sum, cache }),
            'args.size > 100': symbolic({ operation: sum, cache }),
        }
    }

}
