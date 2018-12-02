
import constants from '../../contants'

export default class ElementWiseWorkerSuite {
    constructor() {
        this.suite = new Object()

        for (let i = 1; i <= constants.GENERATED_AXIS_SIZE; i++) {
            this.suite[i] = new Object()
            for (let j = 1; j <= constants.GENERATED_AXIS_SIZE; j++) {
                const fn = new Array()

                fn.push(...ElementWiseWorkerSuite.openLoop('R', i))
                fn.push(...ElementWiseWorkerSuite.openLoop('A', j))

                fn.push(...ElementWiseWorkerSuite.defineIndex('R', i))
                fn.push(...ElementWiseWorkerSuite.defineIndex('A', j))

                fn.push(`R.data[RI] = reducer(mapper(A.data[AI]), R.data[RI])`)

                fn.push(...ElementWiseWorkerSuite.closeLoop(i))
                fn.push(...ElementWiseWorkerSuite.closeLoop(j))

                this.suite[i][j] = Function('A', 'R', 'mapper', 'reducer', fn.join('\n'))
            }
        }

    }

    static openLoop(A, count) {
        const loop = new Array()

        for (let i = 0; i < count; i++)
            loop.push(`for(let ${A}${i} = 0; ${A}${i} < ${A}.shape[${i}]; ${A}${i}++){`)

        return loop
    }

    static closeLoop(count) {
        const loopStop = new Array()

        for (let i = 0; i < count; i++)
            loopStop.push(`}`)

        return loopStop
    }

    static defineIndex(A, count) {
        const index = new Array()

        for (let i = 0; i < count; i++)
            index.push(`${A}${i} * ${A}.strides[${i}]`)

        return [`const ${A}I = ${A}.header.offset + `, index.join('+')]
    }
}
