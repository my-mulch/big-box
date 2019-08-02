
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
    axes,
    shape,
    depth = 0,
    ...arrays
}) {

    if (depth === shape.length) {
        updateIndices({ index: indices.of, array: arrays.of })
        updateIndices({ index: indices.with, array: arrays.with })
        updateIndices({ index: indices.result, array: arrays.result })

        return indices
    }

    const axis = axes[depth]

    for (let i = 0; i < shape[axis]; i++) {
        updateOffsets({ array: arrays.of, axis, i, increment: true })
        updateOffsets({ array: arrays.with, axis, i, increment: true })
        updateOffsets({ array: arrays.result, axis, i, increment: true })

        var updatedIndices = litComp({ axes, shape, indices, depth: depth + 1, ...arrays })

        updateOffsets({ array: arrays.of, axis, i, increment: false })
        updateOffsets({ array: arrays.with, axis, i, increment: false })
        updateOffsets({ array: arrays.result, axis, i, increment: false })
    }

    return updatedIndices
}


export const symLoops = function (axis) {
    return `for(let a${axis} = 0; 
                a${axis} < args.shape[${axis}]; 
                a${axis}++){`
}

export const symIndices = function ({ axes, method, shape, size, ...arrays }) {
    return Object.entries(arrays).map(function ([name, array]) {
        if (!array.shape) return ''

        const assign = `${name}Index = `
        const offset = `args.${name}.offset + `
        const dimens = axes.map(function (axis) {
            return array.shape[axis] > 1
                ? `a${axis} * args.${name}.strides[${axis}]`
                : 0
        })

        return assign + offset + dimens.join('+') || 0
    })
}
