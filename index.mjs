import Types from './types/index.mjs'
import Tensor from './tensor/index.mjs'
import Operations from './operations/index.mjs'

/** Numeric Types */
Object.assign(Tensor, Types)

/** Static Operations */
Object.assign(Tensor, Operations.wrap(function ([name, operation]) {
    return [name, function (args) { return new operation(args).invoke() }]
}))

/** Instance Operations */
Object.assign(Tensor.prototype, Operations.wrap(function ([name, operation]) {
    return [name, function (args) { return new operation({ of: this, ...args }).invoke() }]
}))

/** Cached Operations */
Tensor.cached = Operations

export default Tensor
