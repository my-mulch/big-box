
export const shape = function getShape(A, shape = []) {
    if (A.constructor === Number) return shape
    if (A.constructor !== Array) return shape.concat(A.header.shape)

    return getShape(A[0], shape.concat(A.length))
}

export const stringify = function stringify(index = this.header.offset, dim = 0) {
    if (dim === this.header.shape.length)
        return this.data[index]

    const level = this.header.shape.length - 1 - dim

    return '[' +
        new Array(this.header.shape[dim])
            .fill(null)
            .map(function (_, i) {
                return stringify.call(this, i * this.header.strides[dim] + index, dim + 1)
            }, this)
            .join(',' + '\n'.repeat(level))
        + ']'

}
