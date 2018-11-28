
export default class MultiDimArrayUtils {

    static flatten(A, result, index = 0) {
        for (let i = 0; i < A.length || A.header.size; i++)
            if (A[i].constructor === Array)
                this.flatten(A[i], result, index)

            else if (A[i].constructor === Number)
                result[index++] = A[i]

            else /** MultiDimArray */
                result[index++] = A.get(i)
    }

    static sizeup(A, shape = []) {
        if (A.constructor === Number) return shape
        if (A.constructor !== Array) return shape.concat(A.header.shape)

        return this.sizeup(A[0], shape.concat(A.length))
    }

    static stringify(A) { /** TODO */ }

}
