
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

    const i = index[0]
    if (index.length === 1) structure[i] = value
    else structure[i] = structure[i] || []

    insert(index.slice(1), value, structure[i])
}

function* traverse(structure, ind = []) {
    // GENERATOR FUNCTION YIELD VS RETURN
    for (let i = 0; i < structure.length; i++)
        if (Array.isArray(structure[i]))
            yield* traverse(structure[i], ind.concat(i))
        // this else block indicates we are finally traversing
        // over elements themselves. The trick is to gererate
        // all cycles of the indices. In this way, we traverse
        // the structure in all possible directions
        else yield {
            coord: ind.concat(i),
            value: structure[i]
        }
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

function generalReduce(structure, fn) {
    const schematic = traverse(structure)

    let next, acc = 0
    while (next = schematic.next().value) {
        acc = fn(acc, next.value)
    }
    return acc
}

function construct(shape, value = null) {
    if (!shape.length) return value

    const structure = new Array(shape[0])
    for (let i = 0; i < shape[0]; i++)
        structure[i] = construct(shape.slice(1), value)

    return structure
}

module.exports = {
    shape,
    cycle,
    seek,
    insert,
    traverse,
    transpose,
    construct,
    generalReduce
}



