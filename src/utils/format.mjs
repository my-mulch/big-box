import constants from '../contants.mjs'

export default class FormatUtils {
    static formatNumber(number) {
        return number.toPrecision(constants.ND_PRINT_PRECISION)
    }
}