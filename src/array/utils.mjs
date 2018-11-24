import constants from '../top/contants'

export default class ArrayUtils {

    static * indices(shape, index = []) {
        if (shape[0] === undefined)
            yield index

        if (shape[0] === constants.ND_SLICE_CHARACTER)
            yield* this.indices(shape.slice(1), index.concat(constants.ND_SLICE_CHARACTER))

        for (let i = 0; i < shape[0]; i++)
            yield* this.indices(shape.slice(1), index.concat(i))
    }

    static flatten(A, result, index) {
        for (let i = 0; i < A.length || A.header.size; i++) {
            if (A[i].constructor === Array)
                this.flatten(A[i])

            else if (A[i].constructor === Number)
                result[index++] = A[i]

            else /** MultiDimArray */
                result[index++] = A.read(i)
        }
    }

    static flattenIndex(index, stride, offset = 0) {
        for (let i = 0; i < stride.length; i++)
            offset += index[i] * stride[i]

        return offset
    }

    static inflateIndex(index, shape, stride, offset = 0) {
        for (let i = 0; i < stride.length; i++)
            offset += Math.floor(index / stride[i]) % shape[i]

        return offset
    }

    static getShape(A, shape = []) {
        if (A.constructor === Number) return shape
        if (A.constructor !== Array) return shape.concat(A.header.shape)

        return this.getShape(A[0], shape.concat(A.length))
    }

}
