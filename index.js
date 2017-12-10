
const matmat = require('mat-mat')
const utils = require('./utils')

class MultiDimArray {

    constructor(A, header) {
        if (A && header) throw new Error('Cannot specify both header and Array')

        if (header) this.header = header
        else if (A) this.header = utils.createHeader(A)
    }

    reshape(...shape) {
        return new MultiDimArray(null, {
            shape: shape,
            stride: utils.getStride(shape),
            array: this.header.array
        })
    }

    T() {
        return new MultiDimArray(null, {
            shape: this.header.shape.reverse(),
            stride: this.header.stride.reverse(),
            array: this.header.array
        })
    }


    slice(...index) {
        return new MultiDimArray(null, {
            shape: utils.shapeFor(index),
            stride: this.header.stride,
            array: this.header.array,
        })
    }

    generalReduce(fn) {
        return this.header.array.reduce(fn)
    }

    generalMap(fn) {
        return this.header.array.map(fn)
    }

    toString() {

        const elements = []
        let entirety = []

        for (let i = 0; i < dims[0]; i++) {
            if (dims.length === 1)
                elements.push(A[i])
            else {
                const subArr = p(A[i], dims.slice(1), orig)
                entirety.push(`[${subArr.join(', ')}]`)
            }

            if (i + 1 === dims[0] && entirety.length) {
                const newLines = `${'\n'.repeat(dims.length - 1)}`
                return `[${entirety.join(',' + newLines)}]`
            }
        }

        if (elements.length) return elements
    }
}

module.exports = { Array: MultiDimArray }
