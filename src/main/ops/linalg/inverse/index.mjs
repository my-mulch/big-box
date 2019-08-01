import symbolic from './symbolic'
import optimized from './optimized'

export default {
    inverse: {
        'args.result.size > 25': symbolic,
        'args.result.size <= 25': optimized
    }
}
