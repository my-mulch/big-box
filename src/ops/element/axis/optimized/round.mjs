import { indexifyLongWithAxes } from './utils'

export default function (args) {
    return new Function('args', `

        ${new Array(args.result.header.size)
            .fill(null)
            .map(function (_, i) {
                const resultIndex = indexifyLongWithAxes.call(args.result, args.axes, 'o', i)
                const ai = indexifyFlat.call(args.of, resultIndex)
                const ri = indexifyFlat.call(args.result, resultIndex)

                return `args.result.data[${ri}] = args.of.data[${ai}].toFixed(args.precision)`
            })}
        
        return args.result
    `)
}
