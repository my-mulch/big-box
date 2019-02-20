import { resultLoops, resultIndex, innerLoops, innerIndex } from './utils'

export default function (args) {
    return `
        ${args.global || ''}
        
        ${resultLoops(this.axes, `
            const ri = ${resultIndex(this.axes)}
            ${args.initialize || ''}
            
            ${innerLoops(this.axes, `
                const ai = ${innerIndex(this.axes)}
                ${args.operate || ''}
            `)}
            
            args.result[ri] = ${args.assign}
        `)}
            
        return args.result
    `
}
