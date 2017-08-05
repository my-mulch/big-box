/* 
   
           These methods provide basic operations for matrices
   
*/
function elementwise(a, b, f, c = []) {
    for (let i = 0; i < a.length; i++)
        // null for elementwise over only one matrix
        if (Array.isArray(a[i]))
            elementwise(a[i], b ? b[i] : null, f)
        else c[i] = f(a[i], b ? b[i] : null)
    return c
}

function norm(m) {
    const accumulator = (m_i) => accumulator.total += m_i * m_i
    accumulator.total = 0
    elementwise(m, null, accumulator)
    console.log(Math.sqrt(accumulator.total))
}




const start = new Date().getTime()
norm([1, 2, 3])
const end = new Date().getTime()
console.log((end - start) / 1000)


module.exports = {

    /**
     * 
     * Computes f elementwise on two matrices
     * 
     * @param {any} a input matrix
     * @param {any} b input matrix
     * @param {matrix} c result matrix of same size as inputs or empty
     * @param {function} f function to apply 
     * @returns {matrix} matrix with f applied elementwise
     */

    elementwise(a, b, f, c = []) {
        for (let i = 0; i < a.length; i++)
            // null for elementwise over only one matrix
            if (Array.isArray(a[i]))
                elementwise(a[i], b ? b[i] : null, f)
            else c[i] = f(a[i], b ? b[i] : null)
        return c
    },

    /**
     * 
     * Computes elementwise addition on two matrices
     * 
     * @param {matrix} a input matrix
     * @param {matrix} b input matrix
     * @returns {matrix}
     */

    add(a, b) {
        return this.elementwise(a, b, (a_i, b_i) => a_i + b_i)
    },

    /**
     * 
     * Computes elementwise subtraction on two matrices
     * 
     * @param {matrix} a input matrix
     * @param {matrix} b input matrix
     * @returns {matrix}
     */

    sub(a, b) {
        return this.elementwise(a, b, (a_i, b_i) => a_i - b_i)
    },

    /**
     * 
     * Mulitplies input matrix by a scalar
     * 
     * @param {matrix} m
     * @param {scalar} c 
     * @returns {matrix} 
     */
    scale(m, c) {
        return this.elementwise(m, null, (m_i) => m_i * c)
    },

    /**
     * 
     * Computes the dot product of two vectors
     * @param {vector} a 
     * @param {vector} b
     * @returns {scalar} The dot product
     */
    dot(a, b) {
        // return this.norm(a) * this.norm(b) * 
    },

    /**
     * 
     * Computes the squares of a vector elementwise
     * @param {matrix} m 
     * @returns {matrix} 
     */
    square(m) {
        return this.elementwise(m, null, (m_i) => m_i * m_i)
    },

    /**
     * 
     * Computes frobenius norm of a matrix, L2 of vector
     * @param {matrix} m
     * @returns {matrix}
     */
    norm(m) {
        // the accumulator heads through each element and gathers squares
        const accumulator = (m_i) => accumulator.total += m_i * m_i
        accumulator.total = 0
        this.elementwise(m, null, accumulator)
        // we take the root of these accumulated squares
        // such is the definition of the frobenius
        return Math.sqrt(accumulator.total)
    },

    /**
     * 
     * Computes the direction of a vector
     * @param {vector} v 
     * 
     */
    direction(v) {
        const m = this.magnitude(v)
        return v.map(v_i => v_i / m)
    },

    /**
     * 
     * Computes the distance between two vectors
     * @param {vector} a
     * @param {vector} b 
     * 
     */
    distance(a, b) {
        return this.magnitude(this.subtract(a, b))
    }
}



