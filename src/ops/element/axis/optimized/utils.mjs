
export const litassign = function (callback) {
    return new Array(this.result.header.size).fill(null).map(function (_, index) {
        const axisNumeric = aslice(this.axes, resultIndexMapper)
        const rg = axisNumeric.reduce(resultIndexLiteral.call(this.of, index), this.of.header.offset)
        const ri = axisNumeric.reduce(resultIndexLiteral.call(this.result, index), this.result.header.offset)

        return callback(ri, rg)
    }, this)
}

export const inassign = function (callback, rg) {
    return new Array(this.of.header.size / this.result.header.size).fill(null).map(function (_, index) {
        const axisNumeric = aslice(this.axes, innerIndexMapper)
        const ai = axisNumeric.reduce(resultIndexLiteral.call(this.of, index), rg)

        return callback(`args.of.data[${ai}]`)
    }, this)
}

const resultIndexLiteral = function (index, array) {
    return function (resultIndex, axis) {
        return resultIndex +
            Math.floor(index / array.header.strides[axis]) %
            array.header.shape[axis] *
            array.header.strides[axis]
    }
}

