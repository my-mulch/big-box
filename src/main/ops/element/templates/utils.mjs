
function updateOffsets({ array, axis, i, increment }) {
    if (array && array.shape && array.shape[axis] > 1) {
        const update = i * array.strides[axis]
        array.offset += increment ? update : -update
    }
}

function updateIndices({ index, array }) {
    if (index && array) index.push(array.offset)
}

export const litComp = function litComp({
    indices = {
        of: new Array(),
        with: new Array(),
        result: new Array()
    },
    meta,
    depth = 0,
    ...arrays
}) {

    if (depth === meta.fullShape.length) {
        updateIndices({ index: indices.of, array: arrays.of })
        updateIndices({ index: indices.with, array: arrays.with })
        updateIndices({ index: indices.result, array: arrays.result })

        return indices
    }

    const axis = meta.axesShape[depth]

    for (let i = 0; i < meta.fullShape[axis]; i++) {
        updateOffsets({ array: arrays.of, axis, i, increment: true })
        updateOffsets({ array: arrays.with, axis, i, increment: true })

        if (arrays.of !== arrays.result)
            updateOffsets({ array: arrays.result, axis, i, increment: true })

        var updatedIndices = litComp({ meta, indices, depth: depth + 1, ...arrays })

        updateOffsets({ array: arrays.of, axis, i, increment: false })
        updateOffsets({ array: arrays.with, axis, i, increment: false })

        if (arrays.of !== arrays.result)
            updateOffsets({ array: arrays.result, axis, i, increment: false })
    }

    return updatedIndices
}


export const symLoops = function (axis) {
    return `for(let a${axis} = 0; 
                a${axis} < args.meta.fullShape[${axis}]; 
                a${axis}++){`
}

export const symIndices = function ({ meta, ...arrays }) {
    return Object.entries(arrays).map(function ([name, array]) {
        if (!array.shape) return ''

        const assign = `${name}Index = `
        const offset = `args.${name}.offset + `
        const dimens = meta.axesShape.map(function (axis) {
            return array.shape[axis] > 1
                ? `a${axis} * args.${name}.strides[${axis}]`
                : 0
        })

        return assign + offset + dimens.join('+') || 0
    })
}
