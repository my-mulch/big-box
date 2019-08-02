
function updateOffsets({ array, axis, index, increment }) {
    if (array && array.shape && array.shape[axis] > 1) {
        const update = index * array.strides[axis]
        array.offset += increment ? update : -update
    }
}

function updateIndices({ index, array }) {
    if (index && array) index.push(array.offset)
}

export const litComp = function litComp({ arrays, axes, shape, indices, depth = 0 }) {

    if (depth === shape.length) {
        updateIndices({ index: indices.of, array: arrays.of })
        updateIndices({ index: indices.with, array: arrays.with })
        updateIndices({ index: indices.result, array: arrays.result })

        return
    }

    const axis = axes[depth]

    for (let i = 0; i < shape[axis]; i++) {
        updateOffsets({ array: arrays.of, axis, index: i, increment: true })
        updateOffsets({ array: arrays.with, axis, index: i, increment: true })
        updateOffsets({ array: arrays.result, axis, index: i, increment: true })

        litComp({ arrays, axes, shape, indices, depth: depth + 1 })

        updateOffsets({ array: arrays.of, axis, index: i, increment: false })
        updateOffsets({ array: arrays.with, axis, index: i, increment: false })
        updateOffsets({ array: arrays.result, axis, index: i, increment: false })
    }

}


export const symLoop = function (axis) {
    return `for(let a${axis} = 0; 
                a${axis} < args.shape[${axis}]; 
                a${axis}++){`
}

export const symIndx = function ({ array, axes }) {
    const offset = `args.${array.name}.offset`
    const dimens = axes.map(function (axis) {
        return array.shape[axis] > 1
            ? `a${axis} * args.${array.name}.strides[${axis}]`
            : 0
    })

    return offset + dimens.join('+') || 0
}
