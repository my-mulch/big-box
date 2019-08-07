
import { symLoops, symIndices } from './utils'

export default function (operation) {
    return function (args) {
        return new Function('args', [
            operation.begin(args),

            ...args.meta.axesShape.map(symLoops), // loop heads

            ...symIndices(args),

            operation.middle({
                ofReal: `args.of.data.real[ofIndex]`,
                ofImag: `args.of.data.imag[ofIndex]`,

                withReal: `args.with.data.real[withIndex]`,
                withImag: `args.with.data.imag[withIndex]`,

                resultReal: `args.result.data.real[resultIndex]`,
                resultImag: `args.result.data.imag[resultIndex]`,
            }),

            '}'.repeat(args.meta.fullShape.length),

            operation.end(args),

            'return args.result'

        ].join('\n'))
    }
}
