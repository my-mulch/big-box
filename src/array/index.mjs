import { sum, min, range, max, noop, axisSuite, pairSuite, round } from '../ops/element'
import { matMultSuite, invSuite, crossProduct } from '../ops/linalg'

import { arrShape } from '../array/utils'
import util from 'util' // node's
import Header from './header'


export default class MultiDimArray {

    constructor(props) {
        this.header = props.header
        this.data = props.data
    }

    static array(A) {
        const header = new Header({ shape: arrShape(A) })
        const data = new Float64Array(A.flat(header.shape.length))

        return new MultiDimArray({ data, header })
    }

    static zeros(...shape) {
        const header = new Header({ shape })
        const data = new Float64Array(header.size)

        return new MultiDimArray({ data, header })
    }

    static ones(...shape) {
        const header = new Header({ shape })
        const data = new Float64Array(header.size).fill(1)

        return new MultiDimArray({ data, header })
    }

    static arange(...args) {
        const start = args.length === 1 ? 0 : args[0]
        const step = args.length === 3 ? args[2] : 1
        const stop = args.length === 1 ? args[0] : args[1]

        const shape = [Math.ceil((stop - start) / step)]
        const header = new Header({ shape })
        const data = new Float64Array(header.size)

        return range({ start, step, stop, R: new MultiDimArray({ data, header }) })
    }

    static randint(low, high, shape) {
        const header = new Header({ shape })
        const data = new Float64Array(header.size)

        for (let i = 0; i < data.length; i++)
            data[i] = Math.floor(low + Math.random() * (high - low))

        return new MultiDimArray({ header, data })
    }

    axixOperate({ axes, mapper = noop, reducer = noop }) {
        const header = this.header.axis(axes)
        const data = new Float64Array(header.size)

        return axisSuite.call({ A: this, R: new MultiDimArray({ data, header }), axes, mapper, reducer })
    }

    pairOperate({ B, reducer = noop }) {
        const header = new Header({ shape: this.header.shape })
        const data = new Float64Array(header.size)

        return pairSuite.call({ A: this, B: B, R: new MultiDimArray({ data, header }), reducer })
    }

    max(...axes) { return this.axisOperate({ axes, reducer: max }) }
    min(...axes) { return this.axisOperate({ axes, reducer: min }) }
    round(place) { return this.axixOperate({ axes: getIndices(this.header.shape), mapper: round.bind(place) }) }

    plus(B) { return this.pairOperate({ B, reducer: sum }) }
    minus(B) { return this.pairOperate({ B, reducer: diff }) }
    times(B) { return this.pairOperate({ B, reducer: prod }) }
    divide(B) { return this.pairOperate({ B, reducer: quot }) }

    dot(B, R) {
        // const header = R || new Header({ shape: [this.header.shape[0], B.header.shape[1]] })
        // const data = R || new Float64Array(header.size)

        return matMultSuite.call({ A: this, B: B, R: R })
    }

    cross(B, R) {
        const header = R || new Header({ shape: this.header.shape })
        const data = R || new Float64Array(header.size)

        return crossProduct({ A: this, B: B, R: R || new MultiDimArray({ header, data }) })
    }

    inv(R) {
        const header = R || new Header({ shape: this.header.shape })
        const data = R || new Float64Array(header.size)

        return invSuite.call({ A: this, R: R || new MultiDimArray({ header, data }) })
    }

    slice(...indices) {
        if (this.header.fullySpecified(indices))
            return this.get(indices)

        return new MultiDimArray({
            data: this.data,
            header: this.header.slice(indices.map(String)),
        })
    }

    T() {
        const data = this.data
        const header = this.header.transpose()

        return new MultiDimArray({ data, header })
    }

    reshape(...shape) {
        /**  if the array is not contigous, a reshape means data copy */
        if (!this.header.contig)
            return this.axixOperate(getIndices(this.header.shape))

        const data = this.data
        const header = this.header.reshape(shape)

        return new MultiDimArray({ data, header })
    }

    toString() { return this }
    [util.inspect.custom]() { return this.toString() }
}
