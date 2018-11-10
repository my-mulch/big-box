export default class ScalarOperator {
    static add(a, b) { return a + b }
    static multiply(a, b) { return a * b }
    static divide(a, b) { return a / b }
    static subtract(a, b) { return a - b }
    static min(a, b) { return Math.min(a, b) }
    static max(a, b) { return Math.max(a, b) }
    static square(a) { return a * a }
}
