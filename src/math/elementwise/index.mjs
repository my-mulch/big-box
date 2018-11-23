
export default class ScalarOperator {
    /** REDUCERS */
    static add(a, b) { return a + b }
    static multiply(a, b) { return a * b }
    static divide(a, b) { return a / b }
    static subtract(a, b) { return a - b }
    static min(a, b) { return Math.min(a, b) }
    static max(a, b) { return Math.max(a, b) }
    static noop(a, _) { return a }

    /** MAPPERS */
    static square(a) { return a * a }

    static elementwise(operation, ...ndArrays) {
        const { mapper, reducer, result } = operation

        for (let i = 0; i < result.length; i++)
            for (let j = 0; j < ndArrays.length; j++)
                result[i] = reducer(mapper(ndArrays[j].read(i)), result[i])

        return result
    }
}
