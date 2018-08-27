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

    static add(rawArray) {
        return rawArray.reduce((a, b) => a + b)
    }

    static multiply(rawArray) {
        return rawArray.reduce((a, b) => a * b)
    }

    static divide(rawArray) {
        return rawArray.reduce((a, b) => a / b)
    }

    static subtract(rawArray) {
        return rawArray.reduce((a, b) => a - b)
    }

    static min(rawArray) {
        return rawArray.reduce((a, b) => Math.min(a, b))
    }

    static max(array) {
        return rawArray.reduce((a, b) => Math.max(a, b))
    }

}