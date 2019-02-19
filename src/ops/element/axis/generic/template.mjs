import { resultLoops, resultIndex, innerLoops, innerIndex } from './utils'

export default function (args) {
    return `
        const sizeOfInnerAxes = ${args.of.header.size / args.result.header.size}
        
        ${resultLoops(args.axes)}
        const ri = ${resultIndex(args.axes)}
        ${args.initial}

        ${innerLoops(args.axes)}
        const ai = ${innerIndex(args.axes)}
        ${args.operation}
        ${'}'.repeat(args.axes)}

        args.result[ri] = ${args.assigment}
        ${'}'.repeat(args.rl)}
        
        return args.result
    `
}
