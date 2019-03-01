import { symloops, symindex } from './utils'

export default function (args) {
    return `
        ${symloops.call(this, `
            const ai = ${symindex.call(this, OF)}
            const bi = ${symindex.call(this, WITH)}
            const ri = ${symindex.call(this, RESULT)}

            args.result.data[ri] = ${args.reducer(`args.of.data[ai]`, `args.with.data[bi]`)}
        `)}
        
        return args.result
    `
}
