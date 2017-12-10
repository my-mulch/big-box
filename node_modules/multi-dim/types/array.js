const { shape } = require('../index')

// Simple convenience wrapper around array
// yielding its shape
class MDArray {
    constructor(array) {
        this.shape = shape(array)
        this.data = array
    }
}

module.exports = MDArray
