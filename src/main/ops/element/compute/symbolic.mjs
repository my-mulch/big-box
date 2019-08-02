
import { symLoops, symIndices } from './utils'

export default function ({ operation }) {
    return function (args) {
        return new Function('args', [
            'this.cache.fill(0)',

            ...args.axes.map(symLoops), // loop heads

            ...symIndices(args),

            operation.call(args, {
                ofRealIndex: `ofIndex`,
                ofImagIndex: `ofIndex + 1`,

                withRealIndex: `withIndex`,
                withImagIndex: `withIndex + 1`,

                resultRealIndex: `resultIndex`,
                resultImagIndex: `resultIndex + 1`,
            }),

            '}'.repeat(args.shape.length),

            'return args.result'

        ].join('\n')).bind({ cache: new Int32Array(args.result.size) })
    }
}
