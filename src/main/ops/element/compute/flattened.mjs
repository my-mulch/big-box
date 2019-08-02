
import { litComp } from './utils'

export default function ({ operation }) {
    return function (args) {
        return new Function('args', [
            'this.cache.fill(0)',

            'for(let i = 0; i < this.indices.result.length; i++){',

            operation({
                a: `args.of.data[this.indices.of[i]]`,
                b: `args.of.data[this.indices.of[i] + 1]`,

                c: `args.with.data[this.indices.with[i]]`,
                d: `args.with.data[this.indices.with[i] + 1]`,

                r: `args.result.data[this.indices.result[i]]`,
                i: `args.result.data[this.indices.result[i] + 1]`,
            }),

            'return args.result'
        ].join('\n')).bind({
            indices: litComp(args),
            cache: new Uint32Array(args.result.size)
        })
    }
}
