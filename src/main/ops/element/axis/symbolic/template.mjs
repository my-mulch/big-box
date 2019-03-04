import { symloops, symindex, split } from '../../utils'
import { RESULT, INNER } from '../../../../../resources'

export default function (args) {
    const [raxes, iaxes, aaxes] = split(Array.from(this.axes))

    return `
        ${args.global}
        
        ${symloops(raxes, RESULT, `
            const ri = ${symindex(raxes, RESULT)}
            ${args.init}
            
            ${symloops(iaxes, INNER, `
                const ai = ${symindex(aaxes, INNER)}
                ${args.reduce}
            `)}
            
            args.result.data[ri] = ${args.assign}
        `)}
            
        return args.result
    `
}
