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
            const find = stringSandwhich(']', ',', '[', [depth, 1, depth])
            const replace = stringSandwhich(']', '\n', '[', [depth, depth, depth])
            arrStr = arrStr.replace(new RegExp(escapeRegExp(find), 'g'), replace)
        }

        return arrStr
    }
}