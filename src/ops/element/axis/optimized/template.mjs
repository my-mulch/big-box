import { litassign, inassign } from '../utils'

export default function (args) {
    const [raxes, iaxes, aaxes] = split(args.axes)
    return `
        ${args.global || ''}
        
        ${litassign.call(this, function (ri, rg) {
        return `
                ${args.initialize || ''}
                ${args.reducer(inassign.call(this, args.mapper, rg))}
                args.result.data[${ri}] = ${args.assign}
            `
    })}
            
        return args.result
    `
}
