import { multiplication, subtraction, assignment } from '../../../ops'

export const cofactorHelper = function cofactorHelper(A) {
    const size = Math.round(Math.sqrt(A.length))

    if (size === 1)
        return assignment.middle({
            withReal: `args.of.data.real[${indexify.call(this, A[0])}]`,
            withImag: `args.of.data.imag[${indexify.call(this, A[0])}]`,
            resultReal: `var corefinal`,
            resultImag: `var coimfinal`,
        })


    if (size === 2) {
        const a0 = indexify.call(this, A[0])
        const a1 = indexify.call(this, A[1])
        const a2 = indexify.call(this, A[2])
        const a3 = indexify.call(this, A[3])

        return [
            multiplication.middle({
                ofReal: `args.of.data.real[${a0}]`,
                ofImag: `args.of.data.imag[${a0}]`,
                withReal: `args.of.data.real[${a3}]`,
                withImag: `args.of.data.imag[${a3}]`,
                resultReal: `var ar03`,
                resultImag: `var ai03`,
            }),

            multiplication.middle({
                ofReal: `args.of.data.real[${a2}]`,
                ofImag: `args.of.data.imag[${a2}]`,
                withReal: `args.of.data.real[${a1}]`,
                withImag: `args.of.data.imag[${a1}]`,
                resultReal: `var ar21`,
                resultImag: `var ai21`,
            }),

            subtraction.middle({
                ofReal: `ar03`,
                ofImag: `ai03`,
                withReal: `ar21`,
                withImag: `ai21`,
                resultReal: `var corefinal`,
                resultImag: `var coimfinal`,
            }),
        ].join('\n')
    }

    const cofactors = []
    for (let i = 0; i < size; i++) {
        cofactors.push([
            cofactorHelper.call(this, survivors(A, 0, i)),
            multiplication.middle({
                ofReal: `args.of.data.real[${indexify.call(this, A[i])}]`,
                ofImag: `args.of.data.imag[${indexify.call(this, A[i])}]`,
                withReal: `corefinal`,
                withImag: `coimfinal`,
                resultReal: `corefinal`,
                resultImag: `coimfinal`,
            }),
            multiplication.middle({
                ofReal: `${Math.pow(-1, i % 2)}`,
                ofImag: '0',
                withReal: 'corefinal',
                withImag: 'coimfinal',
                resultReal: `core${i}`,
                resultImag: `coim${i}`,
            })
        ].join('\n'))
    }

    return [
        ...cofactors,
        assignment.middle({
            withReal: [...new Array(size).keys()].map(function (i) { return `core${i}` }).join('+'),
            withImag: [...new Array(size).keys()].map(function (i) { return `coim${i}` }).join('+'),
            resultReal: `corefinal`,
            resultImag: `coimfinal`,
        })
    ].join('\n')
}

export const indexify = function (r, c) {
    if (c === undefined)
        [r, c] = flatToRC.call(this, r)

    return this.offset
        + r * this.strides[0]
        + c * this.strides[1]
}

const flatToRC = function (index) {
    const s0 = this.shape[0], s1 = 1

    return [
        Math.floor(index / s0) % this.shape[0],
        Math.floor(index / s1) % this.shape[1],
    ]
}

export const survivors = function (A, r, c) {
    const size = Math.round(Math.sqrt(A.length))

    return A.filter(function (_, index) {
        if (index % size === c) return false // in column
        if (Math.floor(index / size) === r) return false // in row

        return true
    })
}

export const symIndex = function ({ arrayName, indices }) {
    return `${arrayName}.offset + 
                ${indices[0]} * ${arrayName}.strides[0] + 
                ${indices[1]} * ${arrayName}.strides[1]`
}
