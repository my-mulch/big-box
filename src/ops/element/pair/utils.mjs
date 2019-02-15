
export const indexify = function (index) {
    let resultIndex = this.header.offset

    for (let j = 0; j < this.header.shape; j++)
        resultIndex += Math.floor(index / this.header.strides[j]) % this.header.shape[j] * this.header.strides[j]

    return resultIndex
}