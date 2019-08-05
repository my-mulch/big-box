
import { symLoops, symIndices } from './utils'

export default function (operation) {
    return function (args) {
        return new Function('args', [
            operation.begin(args),

            ...args.meta.axesShape.map(symLoops), // loop heads

            ...symIndices(args),

            operation.middle({
                ofRealIndex: `ofIndex`,
                ofImagIndex: `ofIndex + 1`,

                withRealIndex: `withIndex`,
                withImagIndex: `withIndex + 1`,

                resultRealIndex: `resultIndex`,
                resultImagIndex: `resultIndex + 1`,
            }),

            '}'.repeat(args.meta.fullShape.length),

            operation.end(args),

            'return args.result'

        ].join('\n'))
    }
}
