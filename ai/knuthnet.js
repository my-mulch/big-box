const ndim = require('../ndimstruct/manipulate')

const matrix = [
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
        (this.matrix = matrix).unshift(Array(matrix[0].length).fill(1))

        const shape = ndim.shape(this.matrix)
        const dir = [
            { forward: 'right', backward: 'left' },
            { forward: 'down', backward: 'up' }
        ]

        for (let c = 0; c < shape.length; c++) {
            this.crawl({
                dims: ndim.cycle(shape, c),
                cycle: c,
                ...dir[c]
            })
        }

        this.right = this.matrix[0][0]
        this.left = this.matrix[0][0].left
        this.left.right = this
        this.matrix[0][0].left = this

        delete this.matrix
    }

    crawl(specs, last = null, coord = []) {
        if (!specs.dims.length) {
            coord = ndim.cycle(coord, -specs.cycle)
            const value = ndim.seek(coord, this.matrix)

            if (!value) return last
            else return this.link([last, value], coord, specs)
        }

        for (let i = 0; i < specs.dims[0]; i++) {
            const newSpecs = { ...specs }
            newSpecs.dims = newSpecs.dims.slice(1)
            last = this.crawl(newSpecs, last, coord.concat(i))
        }
    }

    link(value, coord, dim) {
        let [prev, current] = value
        if (typeof current === 'number')
            ndim.insert(coord, current = new QNode(), this.matrix)

        if (prev) {
            current[dim.forward] = prev[dim.forward]
            current[dim.forward][dim.backward] = current
        } else prev = current

        prev[dim.forward] = current
        current[dim.backward] = prev

        return current
    }
}

const master = new NDLL(matrix)
