import { symloops, symindex } from './utils'

export default function (args) {
    return `
        ${symloops.call(this.of, `
            const ai = ${symindex.call(this.of)}
            const bi = ${symindex.call(this.with)}
            const ri = ${symindex.call(this.result)}

            args.result.data[ri] = ${args.reducer(`args.of.data[ai]`, `args.with.data[bi]`)}
        `)}
        
        return args.result
    `
}
