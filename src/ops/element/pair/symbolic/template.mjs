import { symloops, symindex } from './utils'
import { RESULT, OF, WITH } from '../../../../contants'

export default function (args) {
    return `
        ${symloops(this, `
            const ai = ${symindex(this, OF)}
            const bi = ${symindex(this, WITH)}
            const ri = ${symindex(this, RESULT)}
            
            args.result.data[ri] = ${args.assignment}
        `)}
        
        return args.result
    `
}
