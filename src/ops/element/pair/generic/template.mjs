import { loops, aIndex, bIndex, rIndex } from './utils'

export default function (args) {
    return `
        ${loops(args.al)}
       
        ${aIndex(args.al)}
        ${bIndex(args.al, args.bl)}
        ${rIndex(args.rl)}

        args.result.data[ri] = ${args.assignment}
        
        ${'}'.repeat(args.al)}
        
        return args.result
    `
}