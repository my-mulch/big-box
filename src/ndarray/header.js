const { scalar, tensor } = require('../math/operations')
const utils = require('../utils/array')

class Header {
    constructor(arg) {

        if (arg instanceof Array) {
            this.shape = utils.getShape(arg)
            this.stride = utils.getStride(this.shape)
            this.array = new Float64Array(tensor.flatten(arg))
            this.size = scalar.product(this.shape)
            this.offset = 0
        }

        else if (arg instanceof Object) {
            this.shape = arg.shape
            this.array = arg.array
            this.size = arg.size || scalar.product(this.shape)
            this.stride = arg.stride || utils.getStride(this.shape)
            this.offset = arg.offset || 0
        }


    }

    exposeProperties(mdaInstance) {
        Object.keys(this).forEach(function (key) {
            mdaInstance[key] = this[key]
        }, this)
    }
}

module.exports = Header
