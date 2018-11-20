
export default class HeaderReshapeUtils {

    static stride(newStride, dimension, shape) {
        if (newStride.length === shape.length) return newStride

        return [dimension * newStride[0]].concat(newStride)
    }

    static resolve(dimension, i, shape) {
        return dimension > 0 ? dimension : this.size / -TensorOperator.multiply(shape)
    }

}
