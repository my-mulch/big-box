
const INDICES = 'indices'
const VALUES = 'values'

function shape(array, size = []) {
    if (!array.length)
        return size

    return shape(array[0], size.concat(array.length))
}

function cycle(array, n) {
    const copy = [...array]
    return copy.splice(-n % copy.length).concat(copy)
}

function seek(index, structure) {
    if (!index.length) return structure

    return seek(index.slice(1), structure[index[0]])
}

function insert(index, value, structure) {
    if (!index.length) return

    const i = index.shift()
    if (!index.length) structure[i] = value
    else structure[i] = structure[i] || []

    insert(index, value, structure[i])
}

function values(structure) {
    return traverse(structure, VALUES)
}

function indices(structure) {
    return traverse(structure, INDICES)
}

function* traverse(structure, type, ind = []) {
    // GENERATOR FUNCTION RETURNS IMPLICITLY
    for (let i = 0; i < structure.length; i++)
        if (Array.isArray(structure[i]))
            yield*
                traverse(structure[i], type, ind.concat(i))
        else
            yield type === INDICES
                ? ind.concat(i)
                : structure[i]
}

function transpose(structure) {
    const indices = traverse(structure, INDICES)

    let i, T = []
    while (i = indices.next().value) {
        const value = seek(i, structure)
        const ti = i.reverse()
        insert(ti, value, T)
    }

    return T
}

function reshape(structure, shape) {
    const oldValues = traverse(structure, VALUES)
    const newStruct = construct(shape)
    const newIndices = traverse(newStruct, INDICES)

    let i
    while (i = newIndices.next().value) {
        const val = oldValues.next().value
        insert(i, val, newStruct)
    }

    return newStruct
}

function construct(shape) {
    if (!shape.length) return null

    const structure = new Array(shape[0])
    for (let i = 0; i < shape[0]; i++)
        structure[i] = construct(shape.slice(1))

    return structure
}

module.exports = {
    shape,
    cycle,
    seek,
    insert,
    traverse,
    transpose,
}



