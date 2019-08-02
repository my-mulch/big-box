
import { litComp } from './utils'

export default function ({ operation }) {
    return function (args) {
        const indices = litComp(args)

        const pointWiseFunction = new Function('args', [
            'this.cache.fill(0)',

            ...[...new Array(args.size).keys()].map(function (i) {
                return operation({
                    a: `args.of.data[${indices.of[i]}]`,
                    b: `args.of.data[${indices.of[i] + 1}]`,

                    c: `args.with.data[${indices.with[i]}]`,
                    d: `args.with.data[${indices.with[i] + 1}]`,

                    r: `args.result.data[${indices.result[i]}]`,
                    i: `args.result.data[${indices.result[i] + 1}]`
                })
            }),

            'return args.result'
        ].join('\n')).bind({
            cache: new Uint32Array(args.result.size)
        })

        indices = null

        return pointWiseFunction
    }
}
