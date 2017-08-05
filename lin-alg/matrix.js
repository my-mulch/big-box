/* 
   
           These methods provide basic operations for matrices
   
*/

const vector = require('./vector')
const ndarray = require('./ndarray')

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
     */
    dot(A,B){
        
    }
}



