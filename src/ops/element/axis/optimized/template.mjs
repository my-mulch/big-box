import { litassign } from '../../utils.mjs'

export default function (args) {
    const [raxes, iaxes, _] = split(args.axes)
    const rinds = [...raxes.keys()]

    return `
        ${args.global || ''}
        
        ${litassign({
            count: this.result.header.size,
            indices: [
                [rinds, this.result, 0], // ri
                [raxes, this.of, 0] // rg
            ],
            assignment: function(ri, rg){
                return  `
                    ${args.initialize || ''}
                    
                    ${args.reduce(litassign({
                        count: this.of.header.size / this.result.header.size,
                        indices: [
                            [iaxes, this.of, rg] // ai
                        ],
                        assignment: function(ai){
                            return args.mapper(`args.of.data[${ai}]`)
                        }
                    }))}

                    args.result.data[${ri}] = ${args.assign}
                `
            }
        })}
            
        return args.result
    `
}
