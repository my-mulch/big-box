import { cofactorHelper, survivors, indexify } from './utils.mjs'
import { multiplication, division, assignment } from '../../../ops'

export default function (args) {
    const size = Math.round(Math.sqrt(args.of.size)),
        template = [...new Array(args.of.size).keys()]

    return new Function('args', [

        /** Here we compute the Adjoint matrix using cofactor expansion */
        ...new Array(args.result.size).fill(null).map(function (_, i) {
            const r = Math.floor(i / size)
            const c = i % size
            const ri = indexify.call(args.result, r, c)

            return [
                cofactorHelper.call(args.of, survivors(template, c, r)),
                multiplication.middle({
                    ofReal: `${Math.pow(-1, (r + c) % 2)}`,
                    ofImag: `0`,
                    withReal: `corefinal`,
                    withImag: `coimfinal`,
                    resultReal: `args.result.data.real[${ri}]`,
                    resultImag: `args.result.data.imag[${ri}]`,
                })
            ].join('\n')

        }),

        /** Using the adjoint matrix, we can quickly compute the determinant */
        ...new Array(size).fill(null).map(function (_, i) {
            const ai = indexify.call(args.of, 0, i)
            const ri = indexify.call(args.result, i, 0)

            return multiplication.middle({
                ofReal: `args.of.data.real[${ai}]`,
                ofImag: `args.of.data.imag[${ai}]`,
                withReal: `args.result.data.real[${ri}]`,
                withImag: `args.result.data.imag[${ri}]`,
                resultReal: `dr${i}`,
                resultImag: `di${i}`,
            })
        }),

        `let detReal =0,  detImag = 0`,

        assignment.middle({
            withReal: [...new Array(size).keys()].map(function (i) { return `dr${i}` }).join('+'),
            withImag: [...new Array(size).keys()].map(function (i) { return `di${i}` }).join('+'),
            resultReal: `detReal`,
            resultImag: `detImag`,
        }),

        /** Finally we can divide each entry of the Adjoint by the determinant to obtain the inverse */
        ...new Array(args.result.size).fill(null).map(function (_, i) {
            const r = Math.floor(i / size)
            const c = i % size
            const ri = indexify.call(args.result, r, c)

            return [
                assignment.middle({
                    withReal: `args.result.data.real[${ri}]`,
                    withImag: `args.result.data.imag[${ri}]`,
                    resultReal: `tempResultReal`,
                    resultImag: `tempResultImag`,
                }),
                division.middle({
                    ofReal: `tempResultReal`,
                    ofImag: `tempResultImag`,
                    withReal: `detReal`,
                    withImag: `detImag`,
                    resultReal: `args.result.data.real[${ri}]`,
                    resultImag: `args.result.data.imag[${ri}]`,
                })
            ].join('\n')
        }),

        `return args.result`

    ].join('\n'))
}
