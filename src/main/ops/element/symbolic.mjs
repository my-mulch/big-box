import { symloop, symindx } from './utils'

export default function ({ operation }) {
    return function (args) {
        return new Function('args', [
            args.axes.map(symloop).join('\n'),
            [
                `const ai = ${symindx({ axes: args.axes, array: args.of })}`,
                `const bi = ${symindx({ axes: args.axes, array: args.with })}`,
                `const ri = ${symindx({ axes: args.axes, array: args.result })}`,

                operation({
                    a: `args.of.data[ai]`,
                    b: `args.of.data[ai + 1]`,

                    c: `args.with.data[bi]`,
                    d: `args.with.data[bi + 1]`,

                    r: `args.result.data[ri]`,
                    i: `args.result.data[ri + 1]`,
                })
            ],
            '}'.repeat(args.axes.length),
        ].join('\n'))
    }
}
