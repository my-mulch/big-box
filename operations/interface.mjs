import Types from '../types/index.mjs'
import Tensor from '../tensor/index.mjs'
import Source from '../template/source.mjs'
import Algebra from '../template/algebra.mjs'

export default class TensorOperation {
    constructor(args) {
        /** Sanitize */
        this.of = Tensor.tensor(args.of)
        this.with = Tensor.tensor(args.with)

        /** Promote */
        this.type = Types.promote(this.of, this.with)
        this.of = this.of.astype(this.type)
        this.with = this.with.astype(this.type)
    }

    shape(axis) {
        return this.header.shape[axis]
    }

    size(size, axis) {
        return size * this.header.shape[axis]
    }

    symbolicSourceBoilerplate() {
        /** Indices */
        this.indices = {}
        this.indices.of = new Source([`const AIndex = ${this.of.header.symbolicIndex(this.axes.of)}`])
        this.indices.with = new Source([`const BIndex = ${this.with.header.symbolicIndex(this.axes.with)}`])
        this.indices.result = new Source([`const RIndex = ${this.result.header.symbolicIndex(this.axes.result)}`])

        /** Variables */
        this.variables = {}
        this.variables.of = Algebra.variable({ symbol: 'A.data', index: 'AIndex', size: this.of.header.type.size })
        this.variables.with = Algebra.variable({ symbol: 'B.data', index: 'BIndex', size: this.with.header.type.size })
        this.variables.result = Algebra.variable({ symbol: 'R.data', index: 'RIndex', size: this.result.header.type.size })
        this.variables.temp = Algebra.variable({ symbol: 'temp', index: 0, size: this.result.header.type.size })
    }
}
