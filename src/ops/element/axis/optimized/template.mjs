import { innerAssign, resultAssign } from '../utils'

export default function (args) {
    return `
        ${args.global || ''}
        
        ${resultAssign.call(this, function (ri, rg) {
            return `
                ${args.initialize || ''}  
                ${args.reducer(innerAssign.call(this, args.mapper, rg))}
                args.result.data[${ri}] = ${args.assign}
            `
        })}
        
        return args.result
    `
}
