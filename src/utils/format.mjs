import constants from '../contants.mjs'

export default class FormatUtils {
    static formatNumber(number) {
        return number
            .toPrecision(constants.ND_PRINT_PRECISION)
            .substring(0, constants.ND_PRINT_PRECISION)
    }

    static likeNumpy(rawArray) {
        return rawArray.map(function (element) {
            return Array.isArray(element)
                ? this.likeNumpy(element)
                : this.formatNumber(element)
        }, this)
    }
}