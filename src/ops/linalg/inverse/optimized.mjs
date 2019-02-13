import { cofactorHelper, survivors } from './utils.mjs'

export default function (args) {
    const size = Math.round(Math.sqrt(args.of.data.length)),
        template = [...new Array(args.of.data.length).keys()]

    return new Function('args', [
        ...new Array(args.of.data.length).fill(null).map(function (_, i) {
            const [r, c] = [Math.floor(i / size), i % size]
            const sign = Math.pow(-1, (r + c) % 2)
            const cofactors = cofactorHelper.call(args, survivors(template, c, r))

            const ri = args.result.header.offset
                + r * args.result.header.strides[0]
                + c * args.result.header.strides[1]

            return `args.result.data[${ri}] = ${sign} * (${cofactors})`
        }),
        `const det = ${new Array(size).fill(null).map(function (_, i) {
            const ai = args.of.header.offset + i * args.of.header.strides[1]
            const ri = args.result.header.offset + i * args.result.header.strides[0]

            return `args.of.data[${ai}] * args.result.data[${ri}]`
        }).join(' + ')}`,

        `for (let i = 0; i < args.of.data.length; i++)
            args.result.data[i] /= det
        
        return args.result
        `,
    ].join('\n'))
}

