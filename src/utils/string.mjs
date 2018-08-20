export default class StringUtils {
    static stringSandwhich(bottom, meat, top, quantities) {
        return bottom.repeat(quantities[0]) +
            meat.repeat(quantities[1]) +
            top.repeat(quantities[2])
    }

    static escapeRegExp(str) {
        return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    }
}