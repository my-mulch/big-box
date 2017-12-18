const { arithmetic, tensor } = require('../algebra/operations')
const utils = require('../utils/array')

class Header {
    constructor(arg) {
        if (arg instanceof Object) {
            this.shape = arg.shape
            this.stride = arg.stride
            this.array = arg.array
            this.offset = arg.offset
            this.size = arg.size
        }

        if (arg instanceof Array) {
            this.shape = utils.getShape(arg)
            this.stride = utils.getStride(this.shape)
            this.array = new Float64Array(tensor.flatten(arg))
            this.size = arithmetic.product(this.shape)
            this.offset = 0
        }
    }

    exposeProperties(mdaInstance) {
        Object.keys(this).forEach(function (key) {
            mdaInstance[key] = this[key]
        }, this)
    }
}

module.exports = Header
