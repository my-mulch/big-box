export default class FormatUtils {
    static formatNumber(number) {
        return number.toPrecision(this.DEFAULT_PRINT_OPTS.PRECISION)
    }
}

FormatUtils.DEFAULT_PRINT_OPTS = {
    PRECISION: 5,
}