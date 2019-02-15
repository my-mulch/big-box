import { indexify } from './utils'

export default function (args) {
    return new Function('args', `
        ${new Array(args.result.header.size).fill(null).map(function (_, i) {
            const ai = indexify.call(args.of, i)
            const bi = indexify.call(args.with, i)
            const ri = indexify.call(args.result, i)

            return `args.result.data[${ri}] = ${args.reducer.symbolic(`args.of.data[${ai}]`, `args.with.data[${bi}]`)}`
        }).join('\n')}

        return args.result
    `)
}