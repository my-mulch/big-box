
import { litComp } from './utils'

export default function ({ operation }) {
    return function (args) {
        return new Function('args', [
            'this.cache.fill(0)',

            'for(let i = 0; i < this.indices.result.length; i++){',

            operation.call(args, {
                ofRealIndex: `this.indices.of[i]`,
                ofImagIndex: `this.indices.of[i] + 1`,

                withRealIndex: `this.indices.with[i]`,
                withImagIndex: `this.indices.with[i] + 1`,

                resultRealIndex: `this.indices.result[i]`,
                resultImagIndex: `this.indices.result[i + 1]`,
            }),

            '}',

            'return args.result'

        ].join('\n')).bind({
            indices: litComp(args),
            cache: new Int32Array(args.result.size)
        })
    }
}
