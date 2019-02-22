
export default function (args) {
    return `
        ${args.global || ''}
        
        ${resultAssign.call(this, function (ri, rg) {
            return `
                ${args.initialize || ''}  
                args.result.data[${ri}] = ${args.reducer(innerAssign.call(this, args.mapper, rg))}
            `
        })}
        
        return args.result
    `
}
