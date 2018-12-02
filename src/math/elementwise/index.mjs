
import { axisWiseWorker } from './utils'

export default class ElementWiseOperator {

    /** REDUCERS */
    static sum(a, b) { return a + b }
    static prod(a, b) { return a * b }
    static quot(a, b) { return a / b }
    static diff(a, b) { return a - b }
    static mod(a, b) { return a % b }
    static min(a, b) { return Math.min(a, b) }
    static max(a, b) { return Math.max(a, b) }
    static pow(a, b) { return Math.pow(a, b) }

    static mean(a, b, i) {
        return b + (a - b) / i
    }

    static norm(a, b, i, size) {
        if (i + 1 < size) return a + b
        else return Math.sqrt(a + b)
    }

    /** MAPPERS */
    static square(a) { return a * a }
    static sqrt(a) { return Math.sqrt(a) }
    static abs(a) { return Math.abs(a) }
    static noop(a) { return a }
    static round(p, a) { return +a.toFixed(p) } // bind me!

    /** OPERATORS */
    static axisWise(opts) {
        const { A, axis, mapper, reducer, result } = opts

        


    }

    static pairWise(args) {
        const { A, B, reducer, result } = args

        for (let i = 0; i < result.length; i++)
            result[i] = reducer(A.get(i), B.get(i), i % axis, axis)
    }
}
