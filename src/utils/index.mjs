import NDArrayUtils from './nd.mjs'
import FormatArrayUtils from './format.mjs'
import HeaderArrayUtils from './header.mjs'
import MathUtils from './math.mjs'
import RawArrayUtils from './raw.mjs'
import TypeArrayUtils from './type.mjs'

export default {
    math: MathUtils,
    array: {
        header: HeaderArrayUtils,
        format: FormatArrayUtils,
        nd: NDArrayUtils,
        raw: RawArrayUtils,
        type: TypeArrayUtils
    },
}