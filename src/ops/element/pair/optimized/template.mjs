import { litassign, litindex } from './utils'

export default function (args) {
    return `
        ${litassign.call(this.result, function (i) {
            const ai = litindex.call(this.of, i)
            const bi = litindex.call(this.with, i)
            const ri = litindex.call(this.result, i)

            return `args.result.data[${ri}] = ${args.reducer(`args.of.data[${ai}]`, `args.with.data[${bi}]`)}`
        })}
        
        return args.result
    `
}
