
export const __Math__ = Object.assign(Math, {
    add: function (a, b) { return a + b },
    subtract: function (a, b) { return a - b },
    divide: function (a, b) { return a / b },
    multiply: function (a, b) { return a * b },
})

export const sizeup = function sizeup(A, shape = []) {
    if (A.constructor === Number)
        return shape

    return sizeup(A[0], shape.concat(A.length))
}

export const stringify = function stringify() {
    const arraystring = makestring.call(this)
    const predecimalmax = predecimalscount(arraystring)
    const postdecimalmax = postdecimalscount(arraystring)

    return arraystring.replace(/-*\d*\.*\d+(e-*\d+)*/g, function (number) {
        return adjustednumber(number, predecimalmax, postdecimalmax)
    })
}



/** Utility utilities */


function countdigits(max, number) { return Math.max(max, number.length) }
function adddecimal(number) { return number.indexOf('.') >= 0 ? number : number + '.0' }

function predecimalscount(arraystring) { return arraystring.match(/-*\d*\./g).reduce(countdigits, 0) - 1 }
function postdecimalscount(arraystring) { return arraystring.match(/\.\d+(e-*\d+)*/g).reduce(countdigits, 0) - 1 }

function adjustednumber(number, presize, postsize) {
    let [pre, post] = number.split('.')

    pre = pre.padStart(presize, ' ')
    post = post.padEnd(postsize, ' ')

    return `${pre}.${post}`
}

function makestring(index = this.offset, dim = 0) {
    if (dim === this.shape.length)
        return adddecimal(`${this.data[index]}`)

    return ['[', ']'].join(new Array(this.shape[dim])
        .fill(null)
        .map(function (_, i) { return makestring.call(this, i * this.strides[dim] + index, dim + 1) }, this)
        .join(',' + '\n'.repeat(this.shape.length - 1 - dim)))
}
