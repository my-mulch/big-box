import * as axis from './axis/index.mjs'
import * as pair from './pair/index.mjs'
import * as linalg from './linalg/index.mjs'
import * as create from './create/index.mjs'

const operations = { ...linalg, ...axis, ...pair, ...create }

export default {
    ...operations,
    wrap: function (invocation) {
        return Object.fromEntries(Object.entries(operations).map(invocation))
    }
}
