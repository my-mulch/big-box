import { indexifyLongWithAxes, innerElements } from './utils'

export default function (args) {
    return new Function('args', `
        let min

        ${new Array(args.result.header.size)
            .fill(null)
            .map(function (_, i) {
                const innerSize = args.of.header.size / args.result.header.size
                const resultIndex = indexifyLongWithAxes.call(args.result, args.axes, 'o', i)
                const ri = indexifyFlat.call(args.result, resultIndex)

                return `
                    min = Number.POSITIVE_INFINITY

                    ${innerElements(args.axes, innerSize, resultIndex, args.of)
                        .map(function (element) { return `if(${element} < min) min = ${element}` })
                        .join('\n')}
                    
                    args.result.data[${ri}] = min
                `
            })}
        
        return args.result
    `)
}
