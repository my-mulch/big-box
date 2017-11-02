const ndim = require('../ndimstruct/manipulate')

const matrix = [
    [1, 1, 1, 1, 1, 1, 1],
    [0, 0, 1, 0, 1, 1, 0],
    [1, 0, 0, 1, 0, 0, 1],
    [0, 1, 1, 0, 0, 1, 0],
    [1, 0, 0, 1, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 1],
    [0, 0, 0, 1, 1, 0, 1],
]

function NDLL(matrix) { // NDim LinkList
    
}

function QNode() {
    return {
        up: null,
        down: null,
        left: null,
        right: null
    }
}

function crawl(specs, last = null, coord = []) {
    if (!specs.dims.length) {
        const value = seek(coord, matrix)
        if (!value) return last
        else return link([last, value], coord, specs)
    }

    for (let i = 0; i < specs.dims[0]; i++) {
        const newSpecs = { ...specs }
        newSpecs.dims = newSpecs.dims.slice(1)
        last = crawl(newSpecs, last, coord.concat(i))
    }
}

function link(value, coord, dim) {
    let [prev, current] = value
    if (typeof current === 'number')
        insert(coord, current = new QNode(), matrix)

    if (prev) {
        current[dim.forward] = prev[dim.forward]
        current[dim.forward][dim.backward] = current
    } else prev = current

    prev[dim.forward] = current
    current[dim.backward] = prev

    return current
}


