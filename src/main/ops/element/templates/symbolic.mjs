
import { symLoops, symIndices } from './utils'

export default function (operation) {
    return function (args) {
        return new Function('args', [
            operation.begin(args),

            ...args.meta.axesShape.map(symLoops), // loop heads

            ...symIndices(args),

            operation.middle({
                ofReal: `args.of.data[ofIndex]`,
                ofImag: `args.of.data[ofIndex + 1]`,

                withReal: `args.with.data[withIndex]`,
                withImag: `args.with.data[withIndex + 1]`,

                resultReal: `args.result.data[resultIndex]`,
                resultImag: `args.result.data[resultIndex + 1]`,
            }),

            '}'.repeat(args.meta.fullShape.length),

            operation.end(args),

            'return args.result'

        ].join('\n'))
    }
}
