
export default function (args) {
    return `
        ${args.global || ''}
        
        ${resultAssignments.call(this, function (ri) {
            return `
                ${args.initialize || ''}
                
                ----------------------      NOT SOLD HERE       ----------------------
                args.reducer(innerOperations.call(this, function (element) { return args.mapper(element) }))
                ----------------------      NOT SOLD HERE       ----------------------

                args.result.data[${ri}] = ${args.assign}
            `
        })}
        
        return args.result
    `
}
