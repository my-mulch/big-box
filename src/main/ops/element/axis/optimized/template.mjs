import { litassign } from '../../utils.mjs'

export default function (args) {
    const [raxes, iaxes, aaxes] = split(args.axes), rinds = [...raxes.keys()]

    return `
        ${args.global}
        
        ${litassign({
            count: this.result.header.size,
            indices: [
                [rinds, this.result, 0], /** ri */
                [raxes, this.of, 0]  /** rg */
            ],
            map: function (ri, rg) {
                return `
                    ${args.init}
                        
                    ${litassign({
                        count: this.of.header.size / this.result.header.size,
                        indices: [[iaxes, this.of, rg]], /** ai */
                        map: args.map,
                        reduce: args.reduce
                    })}

                    args.result.data[${ri}] = ${args.assign}
                `
            }
        })}
            
        return args.result
    `
}
