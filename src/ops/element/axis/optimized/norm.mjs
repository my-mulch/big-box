import { indexifyLongWithAxes, innerElements } from './utils'

export default function (args) {
    return new Function('args', `

        ${new Array(args.result.header.size)
            .fill(null)
            .map(function (_, i) {
                const innerSize = args.of.header.size / args.result.header.size
                const resultIndex = indexifyLongWithAxes.call(args.result, args.axes, 'o', i)
                const ri = indexifyFlat.call(args.result, resultIndex)

                return `args.result.data[${ri}] = Math.sqrt(${
                    innerElements(args.axes, innerSize, resultIndex, args.of)
                        .map(function (element) { return `${element} * ${element}` })
                        .join('+')})`
            })}
        
        return args.result
    `)
}
