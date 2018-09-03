import NDArrayUtils from './nd.mjs'
import FormatArrayUtils from './format.mjs'
import HeaderUtils from './header.mjs'
import MathUtils from './math.mjs'
import RawArrayUtils from './raw.mjs'
import TypedArrayUtils from './type.mjs'

export default {
    math: MathUtils,
    array: {
        header: HeaderUtils,
        format: FormatArrayUtils,
        nd: NDArrayUtils,
        raw: RawArrayUtils,
        type: TypedArrayUtils
    },
}