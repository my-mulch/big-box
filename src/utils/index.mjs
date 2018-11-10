import NDArrayUtils from './nd.mjs'
import HeaderArrayUtils from './header.mjs'
import MathUtils from './math.mjs'
import RawArrayUtils from './raw.mjs'
import TypeArrayUtils from './type.mjs'

export default {
    math: MathUtils,
    array: {
        header: HeaderArrayUtils,
        nd: NDArrayUtils,
        raw: RawArrayUtils,
        type: TypeArrayUtils
    },
}