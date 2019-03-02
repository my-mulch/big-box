
export const litassign = function (callback) {
    const [raxes, ..._] = split(args.axes)
    const rinds = [...raxes.keys()]

    return new Array(this.result.header.size)
        .fill(null)
        .map(function (_, index) {

            return callback(
                rinds.reduce(flatindex.call(this.result, index), this.result.header.offset),
                raxes.reduce(flatindex.call(this.of, index), this.of.header.offset)
            )

        }, this)
}

export const inassign = function (callback, rg) {
    const [_, iaxes, __] = split(args.axes)

    return new Array(this.of.header.size / this.result.header.size)
        .fill(null)
        .map(function (_, index) {

            return callback(`args.of.data[${
                iaxes.reduce(flatindex.call(this.of, index), rg)
            }]`)

        }, this)
}

const flatindex = function (index) {
    return function (resultIndex, axis) {
        return resultIndex +
            Math.floor(index / this.header.strides[axis]) %
            this.header.shape[axis] *
            this.header.strides[axis]
    }
}

