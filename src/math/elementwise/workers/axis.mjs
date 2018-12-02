
import { GENERATED_AXIS_SIZE } from '../../../contants'
import { openLoop, closeLoop, defineIndex } from './utils'

export default class AxisWiseWorkerSuite {
    constructor() {
        this.suite = new Object()

        for (let i = 1; i <= GENERATED_AXIS_SIZE; i++) {
            this.suite[i] = new Object()
            for (let j = 1; j <= GENERATED_AXIS_SIZE; j++) {
                const fn = new Array()

                fn.push(...openLoop({ arrayTag: 'R', count: i }))
                fn.push(...openLoop({ arrayTag: 'A', count: j }))

                fn.push(...defineIndex({ arrayTag: 'R', count: i }))
                fn.push(...defineIndex({ arrayTag: 'A', count: j }))

                fn.push(`R.data[RI] = reducer(mapper(A.data[AI]), R.data[RI])`)

                fn.push(...closeLoop(i))
                fn.push(...closeLoop(j))

                fn.push(`return R`)

                this.suite[i][j] = Function('A', 'R', 'mapper', 'reducer', fn.join('\n'))
            }
        }
    }

    run(args) {
        const { A, R, mapper, reducer } = args
        const worker = this.suite[A.header.shape.length][R.header.shape.length]

        return worker(A, R, mapper, reducer)
    }
}
