import { innerAssign, resultAssign, litindex } from '../utils'

export default function (args) {
    return `
        ${args.global || ''}
        
        ${resultAssign(this, function (i) {
            return `
                ${args.initialize || ''}  
                ${args.reducer(innerAssign.call(this, args.mapper, rg))}
                args.result.data[${litindex(this, RESULT, i)}] = ${args.assign}
            `
        })}
        
        return args.result
    `
}
