
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

function* traverse(structure, ind = []) {
    for (let i = 0; i < structure.length; i++)
        if (Array.isArray(structure[i]))
            yield* traverse(structure[i], ind.concat(i))
        else yield ind.concat(i)
}

function transpose(arr) {
    const indices = traverse(arr)

    let i, T = []
    while (i = indices.next().value) {
        const value = seek(i, arr)
        const ti = i.reverse()
        insert(ti, value, T)
    }

    return T
}

module.exports = {
    shape,
    cycle,
    seek,
    insert,
    traverse,
    transpose,
}
