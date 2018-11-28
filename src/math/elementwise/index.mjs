
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
    static noReduce(a, _) { return a }

    /** MAPPERS */
    static square(a) { return a * a }
    static sqrt(a) { return Math.sqrt(a) }
    static abs(a) { return Math.abs(a) }
    static noMap(a) { return a }

    /** BOUND MAPPERS (fn must bind first argument before calling) */
    static round(p, a) { return +a.toFixed(p) }

    /** OPERATORS */
    static axisWise(args) {
        const { A, strides, mapper, reducer, result } = args

        for (let i = 0, ri = 0; i < A.header.size; i++ , ri = Math.floor(i / axis))
            result[ri] = reducer(mapper(A.get(i, strides)), result[ri])
    }

    static pairWise(args) {
        const { A, B, reducer, result } = args

        for (let i = 0; i < result.length; i++)
            result[i] = reducer(A.get(i), B.get(i))
    }
}
