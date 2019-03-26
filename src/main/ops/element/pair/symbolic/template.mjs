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

            args.result.data[ri] = ${args.reduce(`args.of.data[ai]`, `args.with.data[bi]`)}
        `)}
        
        return args.result
    `
}
