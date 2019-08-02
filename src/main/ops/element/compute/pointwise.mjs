
import { litComp } from './utils'

export default function ({ operation }) {
    return function (args) {
        let indices = litComp(args)

        const pointWiseFunction = new Function('args', [
            'this.cache.fill(0)',

            ...[...new Array(args.size).keys()].map(function (i) {
                return operation.call(args, {
                    ofRealIndex: `${indices.of[i]}`,
                    ofImagIndex: `${indices.of[i] + 1}`,

                    withRealIndex: `${indices.with[i]}`,
                    withImagIndex: `${indices.with[i] + 1}`,

                    resultRealIndex: `${indices.result[i]}`,
                    resultImagIndex: `${indices.result[i] + 1}`,
                })
            }),

            'return args.result'

        ].join('\n')).bind({ cache: new Int32Array(args.result.size) })

        indices = null

        return pointWiseFunction
    }
}
