import { litassign, split, bylines } from '../../utils'

export default function (args) {
    const [raxes, iaxes, _] = split(Array.from(this.axes))
    const rinds = [...raxes.keys()]

    return `
        ${args.global}
        
        ${litassign({
            count: this.result.size / 2,
            metaindices: [
                [rinds, this.result, 0], /** ri */
                [raxes, this.of, 0]  /** rg */
            ],
            reducer: bylines,
            mapper: (function (ri, rg) {
                return `
                    ${args.init}
                        
                    ${litassign({
                        count: this.of.size / this.result.size,
                        metaindices: [[iaxes, this.of, rg]], /** ai */
                        mapper: function (ai) { return args.mapper(ai, ai+1) },
                        reducer: args.reducer
                    })}

                    ${args.assigner(ri, ri + 1)}
                `
            }).bind(this)
        })}
            
        return args.result
    `
}
