import { symloops, symindex } from '../../utils'
import { OF, WITH, RESULT } from '../../../../../resources'

export default function (args) {
    const aaxes = [...this.of.shape.keys()]
    const baxes = [...this.with.shape.keys()]
    const raxes = [...this.result.shape.keys()]
    const broadcast = this.of.shape.length - this.with.shape.length

    return `
        ${symloops(aaxes, OF, `
            const ai = ${symindex(aaxes, OF)}
            const bi = ${symindex(baxes, WITH, broadcast)}
            const ri = ${symindex(raxes, RESULT)}

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

