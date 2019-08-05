import radley from 'radley'

import linalg from './linalg'
import element from './element'
import probability from './probability'

const operationsSuite = radley.suite({
    ...linalg.operations,
    ...element.operations,
    ...probability.operations,

    hash: ['args.of.id', 'args.with.id', 'args.result.id']
})

operationsSuite.utils = {
    ...linalg.utils,
    ...element.utils,
    ...probability.utils,
}

export default operationsSuite
