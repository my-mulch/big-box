import { indexGeneric, loopGeneric } from '../utils'
import { RESULT, INNER } from '../../../../contants'

export default function (args) {
    return `
        ${args.global || ''}
        
        ${loopGeneric(this, RESULT, `
            const ri = ${indexGeneric(this, RESULT)}
            ${args.initialize || ''}
            
            ${loopGeneric(this, INNER, `
                const ai = ${indexGeneric(this, INNER)}
                ${args.operate || ''}
            `)}
            
            args.result.data[ri] = ${args.assign}
        `)}
            
        return args.result
    `
}
