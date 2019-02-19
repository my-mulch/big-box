import { indexifyLongWithAxes, innerElements } from './utils'

export default function (args) {
    return new Function('args', `
        let max

        ${new Array(args.result.header.size)
            .fill(null)
            .map(function (_, i) {
                const innerSize = args.of.header.size / args.result.header.size
                const resultIndex = indexifyLongWithAxes.call(args.result, args.axes, 'o', i)
                const ri = indexifyFlat.call(args.result, resultIndex)

                return `
                    max = Number.NEGATIVE_INFINITY

                    ${innerElements(args.axes, innerSize, resultIndex, args.of)
                        .map(function (element) { return `if(${element} > max) max = ${element}` })
                        .join('\n')}
                    
                    args.result.data[${ri}] = max
                `
            })}
        
        return args.result
    `)
}
