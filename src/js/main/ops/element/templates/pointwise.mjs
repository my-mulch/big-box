
import { litComp } from './utils'

export default function (operation) {
    return function (args) {
        let indices = litComp(args)

        const pointWiseFunction = new Function('args', [
            operation.begin(args),

            ...[...new Array(args.meta.fullSize).keys()].map(function (i) {
                return operation.middle({
                    ofReal: `args.of.data[${indices.of[i]}]`,
                    ofImag: `args.of.data[${indices.of[i] + 1}]`,

                    withReal: `args.with.data[${indices.with[i]}]`,
                    withImag: `args.with.data[${indices.with[i] + 1}]`,

                    resultReal: `args.result.data[${indices.result[i]}]`,
                    resultImag: `args.result.data[${indices.result[i] + 1}]`,
                })
            }),

            operation.end(args),

            'return args.result'

        ].join('\n'))

        indices = null

        return pointWiseFunction
    }
}
