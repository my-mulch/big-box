
import { GENERATED_AXIS_SIZE } from '../../../contants'
import { openLoop, defineIndex, closeLoop } from './utils'

export default class PairWiseWorkerSuite {
    constructor() {
        this.suite = new Object()

        for (let i = 1; i <= GENERATED_AXIS_SIZE; i++) {
            const fn = new Array()

            fn.push(`let RI = 0`)
            fn.push(...openLoop({ arrayTag: 'A', indexTag: 'I', count: i }))

            fn.push(...defineIndex({ arrayTag: 'A', indexTag: 'I', count: i }))
            fn.push(...defineIndex({ arrayTag: 'B', indexTag: 'I', count: i }))

            fn.push(`R.data[RI] = reducer(A.data[AI], B.data[BI])`)
            fn.push(`RI++`)

            fn.push(...closeLoop(i))

            fn.push(`return R`)

            this.suite[i] = Function('A', 'B', 'R', 'reducer', fn.join('\n'))
        }

    }

    run(args) {
        const { A, B, R, reducer } = args
        const worker = this.suite[A.header.shape.length]

        return worker(A, B, R, reducer)
    }
}
