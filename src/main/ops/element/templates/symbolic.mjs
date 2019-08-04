
import { symLoops, symIndices } from './utils'

export default function (operation) {
    return function (args) {
        return new Function('args', [
            'args.result.data.fill(0)',

            ...args.axes.map(symLoops), // loop heads

            ...symIndices(args),

            operation.inner({
                ofRealIndex: `ofIndex`,
                ofImagIndex: `ofIndex + 1`,

                withRealIndex: `withIndex`,
                withImagIndex: `withIndex + 1`,

                resultRealIndex: `resultIndex`,
                resultImagIndex: `resultIndex + 1`,
            }),

            '}'.repeat(args.shape.length),

            operation.outer(),

            'return args.result'

        ].join('\n'))
    }
}
