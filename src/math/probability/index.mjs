export default class ProbabilityOperator {
    static randInt(min, max) {
        return Math.floor(min + Math.random() * max)
    }
}