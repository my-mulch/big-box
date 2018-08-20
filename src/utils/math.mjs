export default class MathUtils {
    static * getIntegerRange(start, end, step) {
        while (start < end) {
            yield start
            start += step
        }
    }

    static isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    static product(rawArray) {
        return rawArray.reduce(function (prod, current) {
            return prod * current
        }, 1)
    }

    static add(a, b) {
        return a + b
    }

    static multiply(a, b) {
        return a * b
    }

    static divide(a, b) {
        return a / b
    }

    static subtract(a, b) {
        return a - b
    }

}