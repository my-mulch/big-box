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

function QNode() {
    this.up = null
    this.down = null
    this.left = null
    this.right = null
}

class NDLL { // NDim LinkList

    constructor(matrix) {
        this.matrix = this.matrix

        const shape = ndim.shape(this.matrix)
        const dir = [
            { forward: 'right', backward: 'left' },
            { forward: 'down', backward: 'up' }
        ]

        for (let c = 0; c < shape.length; c++) {
            this.crawl({
                dims: ndim.cycle(shape, c),
                cycle: c,
                ...dir[c],
            })
        }

        this.master = new QNode()
        this.master.right = this.matrix[0][0]
        this.master.left = this.matrix[0][0].left
        this.matrix[0][0].left = this.master
    }

    crawl(specs, last = null, coord = []) {
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

    link(value, coord, dim) {
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
}

new NDLL(matrix)
