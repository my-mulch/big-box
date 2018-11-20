

export default class HeaderIndicesUtils {

    static flatten(globalIndex, index, dim) {
        return globalIndex + index * this.stride[dim]
    }

    static inflate(index) {
        return function (globalIndex, stride, dim) {
            return globalIndex + Math.floor(index / stride) % this.shape[dim]
        }
    }
}
