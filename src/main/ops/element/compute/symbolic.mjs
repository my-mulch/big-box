
import { symLoop, symIndx } from './utils'

export default function ({ operation }) {
    return function (args) {
        return new Function('args', [
            'this.cache.fill(0)',

            ...args.axes.map(symLoop), // loop heads

            `const ai = ${symIndx({ axes: args.axes, array: args.of })}`,
            `const bi = ${symIndx({ axes: args.axes, array: args.with })}`,
            `const ri = ${symIndx({ axes: args.axes, array: args.result })}`,

            operation({
                a: `args.of.data[ai]`,
                b: `args.of.data[ai + 1]`,

                c: `args.with.data[bi]`,
                d: `args.with.data[bi + 1]`,

                r: `args.result.data[ri]`,
                i: `args.result.data[ri + 1]`,
            }),

            'return args.result'
        ].join('\n')).bind({
            cache: new Uint32Array(args.result.size)
        })
    }
}
