import { __Math__ } from '../../resources'

export const shapeRaw = function (A, shape = []) {
    if (A.constructor === Number || A.constructor === String)
        return shape

    return shapeRaw(A[0], shape.concat(A.length))
}

export const shapeAlign = function ({ short, delta }) {
    return short.reshape({
        shape: new Array(delta)
            .fill(1)
            .concat(short.shape)
    })
}

function axesToShape(axis) { return this.shape[axis] }

export const selfAxesAndShape = function ({ axes = [...this.shape.keys()] }) {
    const axesSet = new Set(axes)
    const axesShape = axes
    const axesSize = axes.map(axesToShape, this).reduce(__Math__.multiply)
    const resultShape = []
    const alignedShape = []

    for (let i = 0; i < this.shape.length; i++)
        if (!axesSet.has(i)) {
            axesShape.push(i)
            resultShape.push(this.shape[i])
            alignedShape.push(this.shape[i])
        } else
            alignedShape.push(1)

    return {
        resultShape,
        alignedShape,
        axesShape,
        axesSize,
        fullShape: this.shape,
        fullSize: this.size
    }
}

export const pairAxesAndShape = function (args) {
    const axesMatch = []
    const axesMismatch = []
    const fullShape = []

    const ofShape = this.shape
    const withShape = args.with.shape

    for (let i = 0; i < ofShape.length; i++)
        if (ofShape[i] === 1) {
            axesMismatch.push(i)
            fullShape.push(withShape[i])
        }

        else if (withShape[i] === 1) {
            axesMismatch.push(i)
            fullShape.push(ofShape[i])
        }

        else if (ofShape[i] === withShape[i]) {
            axesMatch.push(i)
            fullShape.push(ofShape[i])
        }

    const axesShape = axesMismatch.concat(axesMatch)

    return {
        fullShape,
        axesShape,
        axesSize: axesShape.map(axesToShape, this).reduce(__Math__.multiply),
        fullSize: fullShape.reduce(__Math__.multiply),
    }
}
