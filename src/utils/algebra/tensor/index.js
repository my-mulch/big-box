const { traverse } = require('../../array') // general array utils
const ndim = require('../../../ndarray') // class

function elementwiseTensorOperation(op, arrays) {
    const result = ndim.emptyLike(arrays[0])

    for (const [index, value] of traverse(op, arrays))
        result.set('=', [value], ...index)

    return result
}
