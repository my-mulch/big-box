import { symloops, symindex, split } from '../utils'
import { RESULT, INNER } from '../../../../contants'

export default function (args) {
    const [raxes, iaxes, aaxes] = split(args.axes)

    return `
        ${args.global || ''}
        
        ${symloops(raxes, RESULT, `
            const ri = ${symindex(raxes, RESULT)}
            ${args.initialize || ''}
            
            ${symloops(iaxes, INNER, `
                const ai = ${symindex(aaxes, INNER)}
                ${args.reducer || ''}
            `)}
            
            args.result.data[ri] = ${args.assign}
        `)}
            
        return args.result
    `
}
