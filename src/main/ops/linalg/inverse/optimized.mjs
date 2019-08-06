import { cofactorHelper, survivors, indexify } from './utils.mjs'
import { multiplication, division, sum } from '../../../ops'

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
                    resultReal: `args.result.data[${ri}]`,
                    resultImag: `args.result.data[${ri + 1}]`,
                })
            ].join('\n')

        }),

        /** Using the adjoint matrix, we can quickly compute the determinant */
        ...new Array(size).fill(null).map(function (_, i) {
            const ai = indexify.call(args.of, 0, i)
            const ri = indexify.call(args.result, i, 0)

            return multiplication.middle({
                ofReal: `args.of.data[${ai}]`,
                ofImag: `args.of.data[${ai + 1}]`,
                withReal: `args.result.data[${ri}]`,
                withImag: `args.result.data[${ri + 1}]`,
                resultReal: `dr${i}`,
                resultImag: `di${i}`,
            })
        }),

        `let detReal = detImag = 0`,

        sum.middle({
            ofReal: [...new Array(size).keys()].map(function (i) { return `dr${i}` }).join('+'),
            ofImag: [...new Array(size).keys()].map(function (i) { return `di${i}` }).join('+'),
            resultReal: `detReal`,
            resultImag: `detImag`,
        }),

        /** Finally we can divide each entry of the Adjoint by the determinant to obtain the inverse */
        ...new Array(args.result.size).fill(null).map(function (_, i) {
            const r = Math.floor(i / size)
            const c = i % size
            const ri = indexify.call(args.result, r, c)

            return division.middle({
                ofReal: `args.result.data[${ri}]`,
                ofImag: `args.result.data[${ri + 1}]`,
                withReal: `detReal`,
                withImag: `detImag`,
                resultReal: `args.result.data[${ri}]`,
                resultImag: `args.result.data[${ri + 1}]`,
            })
        }),

        `return args.result`

    ].join('\n'))
}
