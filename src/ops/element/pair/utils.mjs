import { OF, WITH } from '../../../contants'

export const symloops = function (body) {
    return new Array(this[OF].header.shape.length)
        .fill(null)
        .map(function (_, i) { return `for(let i${i} = 0; i${i} < args.of.header.shape[${i}]; i${i}++){` })
        .join('\n') + body
}

export const symindex = function (array) {
    const broadcastingDelta = this[OF].header.shape.length - this[WITH].header.shape.length

    return `args.${array}.header.offset` + new Array(this[array].header.shape.length)
        .fill(null)
        .map(function (_, i) { return `i${broadcastingDelta + i} * args.${array}.header.strides[${i}]` })
        .join('+') || 0
}

const litindex = function (index) {
    let resultIndex = this.header.offset

    for (let j = 0; j < this.header.shape; j++)
        resultIndex += Math.floor(index / this.header.strides[j]) % this.header.shape[j] * this.header.strides[j]

    return resultIndex
}

export const litassign = function (callback) {

}

