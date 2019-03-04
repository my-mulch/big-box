import { litassign, bylines } from '../../utils'

export default function (args) {
    const aaxes = [...this.of.header.shape.keys()]
    const baxes = [...this.with.header.shape.keys()]
    const raxes = [...this.result.header.shape.keys()]

    return `
        ${litassign({
            count: this.result.header.size,
            metaindices: [
                [aaxes, this.of, 0], /** ai */
                [baxes, this.with, 0], /** bi */
                [raxes, this.result, 0] /** ci */
            ],
            reduce: bylines,
            map: function (ai, bi, ri) {
                return `args.result.data[${ri}] = ${args.reduce(`args.of.data[${ai}]`, `args.with.data[${bi}]`)}`
            }
        })}
        
        return args.result
    `
}
