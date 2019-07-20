import { cofactorHelper, survivors, indexify } from './utils.mjs'

export default function (args) {
    const size = Math.round(Math.sqrt(args.of.size / 2)),
        template = [...new Array(args.of.size / 2).keys()]

    return new Function('args', `
        ${ /** Here we compute the Adjoint matrix using cofactor expansion */
        new Array(args.result.size).fill(null).map(function (_, i) {
            const r = Math.floor(i / size)
            const c = i % size
            const ri = indexify.call(args.result, r, c)

            const sign = Math.pow(-1, (r + c) % 2)
            const cofactors = cofactorHelper.call(args.of, survivors(template, c, r))

            return `args.result.data[${ri}] = ${sign} * (${cofactors})`
        }).join('\n')}

        const det = ${ /** Using the adjoint matrix, we can quickly compute the determinant */
        new Array(size).fill(null).map(function (_, i) {
            const ai = indexify.call(args.of, 0, i)
            const ri = indexify.call(args.result, i, 0)

            return `args.of.data[${ai}] * args.result.data[${ri}]`
        }).join(' + ')}

        ${ /** Finally we can divide each entry of the Adjoint by the determinant to obtain the inverse */
        new Array(args.result.size).fill(null).map(function (_, i) {
            const r = Math.floor(i / size)
            const c = i % size
            const ri = indexify.call(args.result, r, c)

            return `args.result.data[${ri}] /= det`
        }).join('\n')}

        return args.result
    `)
}

