import symbolic from './symbolic'
import optimized from './optimized'

export default {
    matMult: {
        'args.result.size > 500': symbolic,
        'args.result.size <= 500': optimized,
    }
}
