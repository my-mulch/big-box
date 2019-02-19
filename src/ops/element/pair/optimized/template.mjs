import { indexify } from '../utils'

export default function (args) {
    return `
        ${new Array(args.size).fill(null).map(function (_, i) {
            const ai = indexify.call(args.of, i)
            const bi = indexify.call(args.with, i)
            const ri = indexify.call(args.result, i)

            return `args.result.data[${ri}] = ${args.assignment(ai, bi)}`
        }).join('\n')}

        return args.result
    `
}