
import { flatcomp } from './utils'

export default function ({ operation }) {
    return function (args) {
        const axes = args.axes
        const arrays = { result: args.result, of: args.of, with: args.with }
        const indices = { result: new Array(), of: new Array(), with: new Array() }

        flatcomp({ arrays, axes, indices })

        const pointWiseFunction = new Function('args', [...new Array(args.result.size).keys()]
            .map(function (i) {
                return operation({
                    a: `args.of.data[${indices.of[i]}]`,
                    b: `args.of.data[${indices.of[i] + 1}]`,

                    c: `args.with.data[${indices.with[i]}]`,
                    d: `args.with.data[${indices.with[i] + 1}]`,

                    r: `args.result.data[${indices.result[i]}]`,
                    i: `args.result.data[${indices.result[i] + 1}]`,
                })
            }).join('\n')
        )

        delete indices.of
        delete indices.with
        delete indices.result

        return pointWiseFunction
    }
}
