import { litassign, bylines } from '../../utils'

export default function (args) {
    const aaxes = [...this.of.shape.keys()]
    const baxes = [...this.with.shape.keys()]
    const raxes = [...this.result.shape.keys()]

    return `
        ${litassign({
            count: this.result.size,
            metaindices: [
                [aaxes, this.of, 0], /** ai */
                [baxes, this.with, 0], /** bi */
                [raxes, this.result, 0] /** ci */
            ],
            reducer: bylines,
            mapper: function (ai, bi, ri) {
                return `args.result.data[${ri}] = ${args.reduce(`args.of.data[${ai}]`, `args.with.data[${bi}]`)}`
            }
        })}
        
        return args.result
    `
}
