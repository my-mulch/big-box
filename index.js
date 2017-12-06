
const matmat = require('mat-mat')
const utils = require('./utils')

class MultiDimArray {

    constructor(A, header) {
        this.header = {}

        if (header) this.header = header
        else if (A) this.header = utils.createHeaderFromArray(A)
    }

    reshape(...shape) {
        const attrs = {
            shape: shape,
            bases: utils.getBases(shape)
        }
        const newHeader = utils.updateHeader(this.header, attrs)

        return new MultiDimArray(null, newHeader)
    }

    T() {
        const attrs = {
            shape: this.header.shape.slice().reverse(),
            bases: this.header.bases.slice().reverse()
        }
        const newHeader = utils.updateHeader(this.header, attrs)

        return new MultiDimArray(null, newHeader)
    }

    generalReduce(fn) {
        return this.header.array.reduce(fn)
    }

    generalMap(fn) {
        return this.header.array.map(fn)
    }

    _(...index) {
        const attrs = {}
        attrs.shape = utils.subShape(this.header.shape, index)
        attrs.numElements = matmat.prod(attrs.shape)

        const newHeader = utils.updateHeader(this.header, attrs)

        return new MultiDimArray(null, newHeader)
    }
}

module.exports = { Array: MultiDimArray }
