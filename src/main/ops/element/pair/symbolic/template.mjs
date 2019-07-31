import { symloops, symindex, split } from '../../utils'
import { OF, WITH, RESULT } from '../../../../../resources'

export default function (args) {
    const [outerLoops, innerLoops, _] = split(this.axes)
    const allLoops = outerLoops.concat(innerLoops)

    return `
        ${symloops(allLoops, RESULT, `
            const ai = ${symindex(allLoops, OF, this.of)}
            const bi = ${symindex(allLoops, WITH, this.with)}
            const ri = ${symindex(allLoops, RESULT, this.result)}

            ${args.operation({
                a:  `args.of.data[ai]`,
                b:  `args.of.data[ai + 1]`,

                c:  `args.with.data[bi]`,
                d:  `args.with.data[bi + 1]`,

                r: `args.result.data[ri]`,
                i: `args.result.data[ri + 1]`,
            })}
        `)}
        
        return args.result
    `
}

