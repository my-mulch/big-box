import StringUtils from '../string'

export default class FormatUtils {

    static getTemplateArrayString(shape) {
        return shape.reduce(function (template, dimension) {
            return template
                .replace(/\$/g, new Array(dimension)
                    .fill("[$]")
                    .join(","))
        }, "[$]")
    }

    static formatArrStrLikeNumpy(arrStr, depth) {
        while (--depth > 0) {
            const findStr = StringUtils.stringSandwhich(']', ',', '[', [depth, 1, depth])
            const replaceStr = StringUtils.stringSandwhich(']', '\n', '[', [depth, depth, depth])

            const escapedFind = StringUtils.escapeRegExp(findStr)
            arrStr = arrStr.replace(new RegExp(escapedFind, 'g'), replaceStr)
        }

        return arrStr
    }
}