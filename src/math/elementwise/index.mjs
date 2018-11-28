
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
    static noop(a, b) { return a }

    /** MAPPERS */
    static square(a) { return a * a }
    static sqrt(a) { return Math.sqrt(a) }
    static abs(a) { return Math.abs(a) }

    /** OPERATORS */
    static axis(A, strides, mapper, reducer, result) {
        for (let i = 0, ri = 0; i < A.header.size; i++ , ri = Math.floor(i / axis))
            result[ri] = reducer(mapper(A.read(i, strides), result[ri]))
    }

    static pair(A, B, reducer, result) {
        for (let i = 0; i < result.length; i++)
            result[i] = reducer(A.read(i), B.read(i))
    }
}
