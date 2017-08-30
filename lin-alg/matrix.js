/* 
   
           These methods provide basic operations for matrices
   
*/

const vector = require('./vector')
const ndarray = require('./ndarray')


function ndimdot(A,B){
    
}

module.exports = {

    /**
     *                                            A matrix can be used to 
     *                                            transform a vector dim N to K
     *                                            and back                                                          
     *  [1,2,3,4,5]          K   
     *                 [[1,2,3,4,5,6],                                   
     *                  [1,2,3,4,5,6],
     *        N         [1,2,3,4,5,6],       =   [15,30,45,60,75,90] 
     *                  [1,2,3,4,5,6],
     *                  [1,2,3,4,5,6]]
     *
     * Multiplies two matrices
     * 
     * @param {matrix} A
     * @param {matrix} B
     * @returns {matrix} The dot product of two vectors
     */
    dot(A, B) {
        
    }
}



