
import { flatcomp } from './utils'

export default function ({ operation }) {
    return function (args) {
        const axes = args.axes
        const arrays = { result: args.result, of: args.of, with: args.with }
        const indices = { result: new Array(), of: new Array(), with: new Array() }

        flatcomp({ arrays, axes, indices })

        indices.of = new Uint32Array(indices.of)
        indices.with = new Uint32Array(indices.with)
        indices.result = new Uint32Array(indices.result)

        return new Function('args', `
            for(let i = 0; i < this.result.length; i++){
                ${operation({
                    a:  `args.of.data[this.indices.of[i]]`,
                    b:  `args.of.data[this.indices.of[i] + 1]`,
    
                    c:  `args.with.data[this.indices.with[i]]`,
                    d:  `args.with.data[this.indices.with[i] + 1]`,
    
                    r: `args.result.data[this.indices.result[i]]`,
                    i: `args.result.data[this.indices.result[i] + 1]`,
                })}
            }
        `).bind({ indices })
    }
}
