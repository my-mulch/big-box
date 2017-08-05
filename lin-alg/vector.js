/* 

        These methods provide basic operations for vectors

*/

module.exports = {

    /**
     * 
     * Computes the dot product of two vectors
     * @param {vector} a 
     * @param {vector} b
     * @returns {scalar} The dot product
     */
    dot(a, b) {
        const accumulator = (a_i, b_i) => accumulator.total += a_i * b_i
        accumulator.total = 0
        this.elementwise(a, b, accumulator)
        return accumulator.total
    },
    
}
