
import { litComp } from './utils'

export default function (operation) {
    return function (args) {
        let indices = litComp(args)

        const pointWiseFunction = new Function('args', [
            operation.begin(args),

            ...[...new Array(args.meta.fullSize).keys()].map(function (i) {
                return operation.middle({
                    ofReal: `args.of.data.real[${indices.of[i]}]`,
                    ofImag: `args.of.data.imag[${indices.of[i]}]`,

                    withReal: `args.with.data.real[${indices.with[i]}]`,
                    withImag: `args.with.data.imag[${indices.with[i]}]`,

                    resultReal: `args.result.data.real[${indices.result[i]}]`,
                    resultImag: `args.result.data.imag[${indices.result[i]}]`,
                })
            }),

            operation.end(args),

            'return args.result'

        ].join('\n'))

        indices = null

        return pointWiseFunction
    }
}
