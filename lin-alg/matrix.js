/* 

        These methods provide basic operations for matrices

*/

/**
 * 
 * Returns the shape of a given matrix
 * @param {matrix} A
 * 
 */

function shape(A) {
    return [A.length, A[0].length]
}

/**
 * 
 * Returns the column for a given matrix
 * 
 * @param {matrix} A
 * @param {int} j 
 */
function column(A, i) {
    return A.map(a => a[i])
}

/**
 * 
 * Returns the column for a given matrix
 * 
 * @param {int} rows
 * @param {int} cols
 */
function zeros(rows, cols) {
    return Array(rows).fill(null).map(_ => [])
}



