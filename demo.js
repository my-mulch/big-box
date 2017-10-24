function insert(index, value, structure) {
    if (!index.length) return

    const i = index.shift()
    structure[i] = structure[i] || (index.length ? [] : value)
    insert(index, value, structure[i])
}

function seek(index, structure) {
    if (!index.length) return structure

    return seek(index.slice(1), structure[index[0]])
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
// 2, 4, 2
const arr = [
    [
        [1, 2],
        [3, 4],
        [5, 6],
        [7, 8]
    ],
    [
        [9, 10],
        [11, 12],
        [13, 14],
        [15, 16]
    ]
]