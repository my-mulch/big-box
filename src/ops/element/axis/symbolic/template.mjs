import { symloops, symindex } from '../utils'
import { RESULT, INNER } from '../../../../contants'

export default function (args) {
    return `
        ${args.global || ''}
        
        ${symloops.call(this, RESULT, `
            const ri = ${symindex.call(this, RESULT)}
            ${args.initialize || ''}
            
            ${symloops.call(this, INNER, `
                const ai = ${symindex.call(this, INNER)}
                ${args.operate || ''}
            `)}
            
            args.result.data[ri] = ${args.assign}
        `)}
            
        return args.result
    `
}
