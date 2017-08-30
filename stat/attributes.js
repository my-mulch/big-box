/* 

        These methods provide statistical information about our datasets

*/

module.exports = {
    /* Dependencies */
    vector: require('../lin-alg/vector'),

    /**
     * 
     * Computes the max of the data set
     * 
     * @param {vector} x 
     * 
     */
    max: function (x) {
        return x.reduce((a, v) => a > v ? a : v)
    },

    /**
     * 
     * Computes the min of the data set
     * 
     * @param {vector} x 
     * 
     */
    min: function (x) {
        return x.reduce((a, v) => a < v ? a : v)
    },

    /**
     * 
     * Computes the range of the data set
     * 
     * @param {vector} x 
     * 
     */
    range: function (x) {
        return max(x) - min(x)
    },

    /**
     * 
     * Computes elementwise deviations from the mean
     * 
     * @param {vector} x 
     * 
     */
    deviations: function (x) {
        const x_bar = mean(x)
        return x.map(x_i => x_i - x_bar)
    },

    /**
     * 
     * Computes the variance of a vector
     * 
     * @param {vector} x 
     * 
     */
    variance(x) {
        return vector.sum_squares(deviations(x)) / x.length - 1
    },

    /**
     * 
     * Computes the covariance of two vectors
     * 
     * @param {vector} x 
     * @param {vector} y
     * 
     */
    covariance: function (x, y) {
        return vector.dot(deviations(x), deviations(y)) / x.length - 1
    },

    /**
     * 
     * Computes the correlation of two vectors
     * 
     * @param {vector} x 
     * @param {vector} y
     * 
     */
    correlation: function (x, y) {
        return covariance(x, y) / std_dev(x) / std_dev(y)
    },

    /**
     * 
     * Computes the standard deviation of a dataset x
     * 
     * @param {vector} x 
     * 
     */
    std_dev: function (x) {
        return Math.sqrt(variance(x))
    },

    /**
     * 
     * Computes the interquartile range (75 - 25)
     * 
     * @param {vector} x 
     * 
     */
    iqr: function (x) {
        return percentile(x, 0.75) - percentile(x, 0.25)
    },

    /**
     * 
     * Computes the mean of vector x, non-elementwise
     * 
     * @param {vector} x 
     * 
     */
    mean: function (x) {
        return x.reduce((a, v) => a + v) / x.length
    },

    /**
     * 
     * Computes the value less than which percentage 'p' of our data lies
     * 
     * @param {vector} x 
     * @param {float} p
     * 
     */
    percentile: function (x, p) {
        return x.sort()[Math.floor(p * x.length)]
    },



    /**
     * 
     * Computes the mode of our input vector
     * 
     * @param {vector} x 
     * 
     */
    mode: function (x) {
        const counts = {}
        let max = 0
        for (let x_i of x) {
            counts[x_i]
                ? counts[x_i]++
                : counts[x_i] = 1

            if (counts[x_i] > max)
                max = x_i
        }

        return max
    }

}



