import { litassign } from './utils'

export default function (args) {
    return `
        ${litassign.call(this, function (ai, bi, ri) {
            const ae = `args.of.data[${ai}]`
            const be = `args.with.data[${bi}]`

            return `args.result.data[${ri}] = ${args.reducer(ae, be)}`
        })}
        
        return args.result
    `
}
