import { litassign, bylines } from '../../utils'

export default function (args) {
    const aaxes = [...this.of.shape.keys()]
    const baxes = [...this.with.shape.keys()]
    const raxes = [...this.result.shape.keys()]

    return `
        ${litassign({
            count: this.result.size / 2,
            metaindices: [
                [aaxes, this.of, 0], /** ai */
                [baxes, this.with, 0], /** bi */
                [raxes, this.result, 0] /** ci */
            ],
            reducer: bylines,
            mapper: function (ai, bi, ri) {
                return args.operation({
                    a:  `args.of.data[${ai}]`,
                    b:  `args.of.data[${ai + 1}]`,
    
                    c:  `args.with.data[${bi}]`,
                    d:  `args.with.data[${bi + 1}]`,
    
                    r: `args.result.data[${ri}]`,
                    i: `args.result.data[${ri + 1}]`,
                })
            }
        })}
        
        return args.result
    `
}
