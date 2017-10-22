/* 

        These methods provide basic operations for vectors

*/

module.exports = {

    /**
     * 
     * Computes the dot product of two vectors
     * @param {vector} u
     * @param {vector} v
     * @returns {scalar} The dot product
     */
    dot(u, v) {
        if(u.length != v.length)
            throw new Error('Vectors must share same dimension')
        
        return u.reduce((partial, ui, i) => {
            return partial + ui * v[i]
        }, 0)
    },
    
}

console.log(module.exports.dot([4,3,2], [3,4,-2]))