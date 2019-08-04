
import { litComp } from './utils'

export default function (operation) {
    return function (args) {
        let indices = litComp(args)

        const pointWiseFunction = new Function('args', [
            'args.result.data.fill(0)',

            ...[...new Array(args.size).keys()].map(function (i) {
                return operation.inner({
                    ofRealIndex: `${indices.of[i]}`,
                    ofImagIndex: `${indices.of[i] + 1}`,

                    withRealIndex: `${indices.with[i]}`,
                    withImagIndex: `${indices.with[i] + 1}`,

                    resultRealIndex: `${indices.result[i]}`,
                    resultImagIndex: `${indices.result[i] + 1}`,
                })
            }),

            operation.outer(),

            'return args.result'

        ].join('\n'))

        indices = null

        return pointWiseFunction
    }
}
