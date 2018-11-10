export default class RawArrayUtils {
    static * flatten(rawArray) {
        for (let i = 0; i < rawArray.length; i++) {
            if (Array.isArray(rawArray[i]))
                yield* this.flatten(rawArray[i])

            if (rawArray[i] instanceof Object)
                yield rawArray[i].toRawFlat()

            if (typeof rawArray[i] === 'number')
                yield rawArray[i]
        }
    }

    static createRawArray(shape, fill = function () { return 0 }) {
        if (!shape.length) return fill()

        return new Array(shape[0]).fill(null).map(function () {
            return this.createRawArray(shape.slice(1), fill)
        }, this)
    }

    static cycle(rawArray, n) {
        const copy = [...rawArray]
        return copy.splice(-n % copy.length).concat(copy)
    }

    static getShape(rawArray, shape = []) {
        if (!rawArray.length) return shape

        return this.getShape(rawArray[0], shape.concat(rawArray.length))
    }

}