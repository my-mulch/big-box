import { litassign, split } from '../../utils'

export default function (args) {
    const [raxes, iaxes, _] = split(Array.from(this.axes))
    const rinds = [...raxes.keys()]

    return `
        ${args.global}
        
        ${litassign({
            count: this.result.header.size,
            metaindices: [
                [rinds, this.result, 0], /** ri */
                [raxes, this.of, 0]  /** rg */
            ],
            map: (function (ri, rg) {
                return `
                    ${args.init}
                        
                    ${litassign({
                        count: this.of.header.size / this.result.header.size,
                        metaindices: [[iaxes, this.of, rg]], /** ai */
                        map: function(ai) { return args.map(`args.of.data[${ai}]`) },
                        reduce: args.reduce
                    })}

                    args.result.data[${ri}] = ${args.assign}
                `
            }).bind(this)
        })}
            
        return args.result
    `
}