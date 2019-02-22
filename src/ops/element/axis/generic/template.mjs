import { indexGeneric, loopGeneric } from '../utils'

export default function (args) {
    return `
        ${args.global || ''}
        
        ${loopGeneric(this.axes, RESULT, `
            const ri = ${indexGeneric(this.axes, RESULT)}
            ${args.initialize || ''}
            
            ${loopGeneric(this.axes, INNER, `
                const ai = ${indexGeneric(this.axes, INNER)}
                ${args.operate || ''}
            `)}
            
            args.result.data[ri] = ${args.assign}
        `)}
            
        return args.result
    `
}
