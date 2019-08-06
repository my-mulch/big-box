import { division, multiplication, subtraction, assignment } from '../../../ops'
import { symIndex } from './utils'

export default function (args) {
    return new Function('args', [
        `const dim = Math.floor(Math.sqrt(args.result.size))`,
        `const copy = args.of.copy()`,

        // Perform elementary row operations
        `for (let i = 0; i < dim; i += 1) {`,

        // get the element e on the diagonal
        `let er = copy.data[${symIndex({ arrayName: 'copy', indices: ['i', 'i'] })}]`,
        `let ei = copy.data[${symIndex({ arrayName: 'copy', indices: ['i', 'i'] })} + 1]`,

        // if we have a 0 on the diagonal (we'll need to swap with a lower row)
        `if(Math.abs(er) < 1e-5 && Math.abs(ei < 1e-5)){
            for (ii = i + 1; ii < dim; ii += 1) {
                let pr = copy.data[${symIndex({ arrayName: 'copy', indices: ['ii', 'i'] })}]
                let pi = copy.data[${symIndex({ arrayName: 'copy', indices: ['ii', 'i'] })} + 1]

                if (Math.abs(pr) > 1e-5 || Math.abs(pi) > 1e-5) {
                    for (j = 0; j < dim; j++) {
                        er = copy.data[${symIndex({ arrayName: 'copy', indices: ['i', 'j'] })}]
                        ei = copy.data[${symIndex({ arrayName: 'copy', indices: ['i', 'j'] })} + 1]
                        
                        copy.data[${symIndex({ arrayName: 'copy', indices: ['i', 'j'] })}] = copy.data[${symIndex({ arrayName: 'copy', indices: ['ii', 'j'] })}]
                        copy.data[${symIndex({ arrayName: 'copy', indices: ['i', 'j'] })} + 1] = copy.data[${symIndex({ arrayName: 'copy', indices: ['ii', 'j'] })} + 1]
                        
                        copy.data[${symIndex({ arrayName: 'copy', indices: ['ii', 'j'] })}] = er
                        copy.data[${symIndex({ arrayName: 'copy', indices: ['ii', 'j'] })} + 1] = ei


                        er = args.result.data[${symIndex({ arrayName: 'args.result', indices: ['i', 'j'] })}]
                        ei = args.result.data[${symIndex({ arrayName: 'args.result', indices: ['i', 'j'] })} + 1]

                        args.result.data[${symIndex({ arrayName: 'args.result', indices: ['i', 'j'] })}] = args.result.data[${symIndex({ arrayName: 'args.result', indices: ['ii', 'j'] })}]
                        args.result.data[${symIndex({ arrayName: 'args.result', indices: ['i', 'j'] })} + 1] = args.result.data[${symIndex({ arrayName: 'args.result', indices: ['ii', 'j'] })} + 1]

                        args.result.data[${symIndex({ arrayName: 'args.result', indices: ['ii', 'j'] })}] = er
                        args.result.data[${symIndex({ arrayName: 'args.result', indices: ['ii', 'j'] })} + 1] = ei

                    }

                    break
                }
            }

            er = copy.data[${symIndex({ arrayName: 'copy', indices: ['i', 'i'] })}]
            ei = copy.data[${symIndex({ arrayName: 'copy', indices: ['i', 'i'] })} + 1]
        }`,

        `for (let j = 0; j < dim; j++) {`,

        assignment.middle({
            withReal: `copy.data[${symIndex({ arrayName: 'copy', indices: ['i', 'j'] })}]`,
            withImag: `copy.data[${symIndex({ arrayName: 'copy', indices: ['i', 'j'] })} + 1]`,
            resultReal: `var tempReal`,
            resultImag: `var tempImag`,
        }),

        division.middle({
            ofReal: `tempReal`,
            ofImag: `tempImag`,
            withReal: `er`,
            withImag: `ei`,
            resultReal: `copy.data[${symIndex({ arrayName: 'copy', indices: ['i', 'j'] })}]`,
            resultImag: `copy.data[${symIndex({ arrayName: 'copy', indices: ['i', 'j'] })} + 1]`,
        }),


        assignment.middle({
            withReal: `args.result.data[${symIndex({ arrayName: 'args.result', indices: ['i', 'j'] })}]`,
            withImag: `args.result.data[${symIndex({ arrayName: 'args.result', indices: ['i', 'j'] })} + 1]`,
            resultReal: `var tempReal`,
            resultImag: `var tempImag`,
        }),

        division.middle({
            ofReal: `tempReal`,
            ofImag: `tempImag`,
            withReal: `er`,
            withImag: `ei`,
            resultReal: `args.result.data[${symIndex({ arrayName: 'args.result', indices: ['i', 'j'] })}]`,
            resultImag: `args.result.data[${symIndex({ arrayName: 'args.result', indices: ['i', 'j'] })} + 1]`,
        }),

        `}`,

        `for (let ii = 0; ii < dim; ii++) {`,

        `if (ii == i) { continue; }`,

        `er = copy.data[${symIndex({ arrayName: 'copy', indices: ['ii', 'i'] })}]`,
        `ei = copy.data[${symIndex({ arrayName: 'copy', indices: ['ii', 'i'] })} + 1]`,

        `for (let j = 0; j < dim; j++) {`,

        multiplication.middle({
            ofReal: `er`,
            ofImag: `ei`,
            withReal: `copy.data[${symIndex({ arrayName: 'copy', indices: ['i', 'j'] })}]`,
            withImag: `copy.data[${symIndex({ arrayName: 'copy', indices: ['i', 'j'] })} + 1]`,
            resultReal: `let elimCopyReal`,
            resultImag: `let elimCopyImag`,
        }),

        subtraction.middle({
            ofReal: `copy.data[${symIndex({ arrayName: 'copy', indices: ['ii', 'j'] })}]`,
            ofImag: `copy.data[${symIndex({ arrayName: 'copy', indices: ['ii', 'j'] })} + 1]`,
            withReal: `elimCopyReal`,
            withImag: `elimCopyImag`,
            resultReal: `copy.data[${symIndex({ arrayName: 'copy', indices: ['ii', 'j'] })}]`,
            resultImag: `copy.data[${symIndex({ arrayName: 'copy', indices: ['ii', 'j'] })} + 1]`,
        }),

        multiplication.middle({
            ofReal: `er`,
            ofImag: `ei`,
            withReal: `args.result.data[${symIndex({ arrayName: 'args.result', indices: ['i', 'j'] })}]`,
            withImag: `args.result.data[${symIndex({ arrayName: 'args.result', indices: ['i', 'j'] })} + 1]`,
            resultReal: `let elimResultReal`,
            resultImag: `let elimResultImag`,
        }),

        subtraction.middle({
            ofReal: `args.result.data[${symIndex({ arrayName: 'args.result', indices: ['ii', 'j'] })}]`,
            ofImag: `args.result.data[${symIndex({ arrayName: 'args.result', indices: ['ii', 'j'] })} + 1]`,
            withReal: `elimResultReal`,
            withImag: `elimResultImag`,
            resultReal: `args.result.data[${symIndex({ arrayName: 'args.result', indices: ['ii', 'j'] })}]`,
            resultImag: `args.result.data[${symIndex({ arrayName: 'args.result', indices: ['ii', 'j'] })} + 1]`,
        }),

        `}`,
        `}`,
        `}`,

        `return args.result`,

    ].join('\n'))
}
