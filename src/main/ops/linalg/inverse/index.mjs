import symbolic from './symbolic'
import optimized from './optimized'

export default {
    inverse: {
        'args.result.size > 16': symbolic,
        'args.result.size <= 16': optimized
    }
}
