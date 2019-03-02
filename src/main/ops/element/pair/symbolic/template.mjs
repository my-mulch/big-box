import { symloops, symindex } from './utils'

export default function (args) {
    const aaxes = [...this.of.header.shape.keys()]
    const baxes = [...this.with.header.shape.keys()]
    const raxes = [...this.result.header.shape.keys()]
    const broadcast = this.of.header.shape.length - this.with.header.shape.length

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
