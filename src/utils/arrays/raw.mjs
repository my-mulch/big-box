export default class RawArrayUtils {
    static * flatten(rawArray) {
        for (let i = 0; i < rawArray.length; i++) {
            if (Array.isArray(rawArray[i]))
                yield* RawArrayUtils.flatten(rawArray[i])
            else
                yield rawArray[i]
        }
    }

    static slice(rawArray, index) {
        if (!index.length) return rawArray

        return RawArrayUtils.slice(rawArray[index[0]], index.slice(1))
    }

    static createRawArray(shape, fill = () => 0) {
        if (!shape.length) return fill()

        return new Array(shape[0]).fill(null).map(function () {
            return RawArrayUtils.createRawArray(shape.slice(1), fill)
        })
    }

    static cycle(rawArray, n) {
        const copy = [...rawArray]
        return copy.splice(-n % copy.length).concat(copy)
    }

    static insert(rawArray, index, value) {
        if (index.length === 1) {
            rawArray[index[0]] = value
            return
        }

        RawArrayUtils.insert(rawArray[index[0]], index.slice(1), value)
    }

    static getShape(rawArray, shape = []) {
        if (!rawArray.length) return shape

        return RawArrayUtils.getShape(rawArray[0], shape.concat(rawArray.length))
    }

    static * getGenerator(rawArray) {
        yield* rawArray
    }

    static autoReturningFunctionFromGenerator(generator) {
        return function autoReturner() {
            return generator.next().value
        }
    }

    static product(rawArray) {
        return rawArray.reduce(function (prod, current) {
            return prod * current
        }, 1)
    }
}