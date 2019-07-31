import { litassign, bylines, split } from '../../utils'

export default function (args) {
    const [outerLoops, innerLoops, _] = split(this.axes)
    const allLoops = outerLoops.concat(innerLoops)

    return `
        ${litassign({
            count: this.result.size / 2,
            metaindices: [
                [allLoops, this.of, 0], /** ai */
                [allLoops, this.with, 0], /** bi */
                [allLoops, this.result, 0] /** ri */
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
