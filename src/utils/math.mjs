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

    static max(rawArray) {
        return rawArray.reduce((a, b) => Math.max(a, b))
    }

    static square(rawArray) {
        return rawArray.map(a => a * a)
    }

    static mean(rawArray) {
        return MathUtils.add(rawArray) / rawArray.length
    }

    static norm(rawArray) {
        return Math.sqrt(MathUtils.add(MathUtils.square(rawArray)))
    }

}