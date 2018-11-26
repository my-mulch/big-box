
export default class ScalarOperator {
    /** REDUCERS */
    static add(a, b) { return a + b }
    static multiply(a, b) { return a * b }
    static divide(a, b) { return a / b }
    static subtract(a, b) { return a - b }
    static min(a, b) { return Math.min(a, b) }
    static max(a, b) { return Math.max(a, b) }
    static noop(a, b) { return a }

    /** MAPPERS */
    static square(a) { return a * a }

    static elementwise(A, B, mapper, reducer, result) {
        const axis = A.header.size / result.length

        for (let i = 0, ri = 0; i < A.header.size; i++ , ri = Math.floor(i / axis))
            result[ri] = reducer(mapper(A._(i)), mapper(B._(i)) || result[ri])
    }
}
