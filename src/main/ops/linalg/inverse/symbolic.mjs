import { division, multiplication, subtraction, assignment } from '../../../ops'
import { symIndex } from './utils'

export default function () {
    return new Function('args', [
        `const dim = Math.floor(Math.sqrt(args.result.size))`,
        `const copy = args.of.copy()`,

        // Perform elementary row operations
        `for (let i = 0; i < dim; i += 1) {`,

        // get the element e on the diagonal
        `let er = copy.data.real[${symIndex({ arrayName: 'copy', indices: ['i', 'i'] })}]`,
        `let ei = copy.data.imag[${symIndex({ arrayName: 'copy', indices: ['i', 'i'] })}]`,

        // if we have a 0 on the diagonal (we'll need to swap with a lower row)
        `if(Math.abs(er) < 1e-5 && Math.abs(ei < 1e-5)){
            for (ii = i + 1; ii < dim; ii += 1) {
                let pr = copy.data.real[${symIndex({ arrayName: 'copy', indices: ['ii', 'i'] })}]
                let pi = copy.data.imag[${symIndex({ arrayName: 'copy', indices: ['ii', 'i'] })}]

                if (Math.abs(pr) > 1e-5 || Math.abs(pi) > 1e-5) {
                    for (j = 0; j < dim; j++) {
                        er = copy.data.real[${symIndex({ arrayName: 'copy', indices: ['i', 'j'] })}]
                        ei = copy.data.imag[${symIndex({ arrayName: 'copy', indices: ['i', 'j'] })}]
                        
                        copy.data.real[${symIndex({ arrayName: 'copy', indices: ['i', 'j'] })}] = copy.data.real[${symIndex({ arrayName: 'copy', indices: ['ii', 'j'] })}]
                        copy.data.imag[${symIndex({ arrayName: 'copy', indices: ['i', 'j'] })}] = copy.data.imag[${symIndex({ arrayName: 'copy', indices: ['ii', 'j'] })}]
                        
                        copy.data.real[${symIndex({ arrayName: 'copy', indices: ['ii', 'j'] })}] = er
                        copy.data.imag[${symIndex({ arrayName: 'copy', indices: ['ii', 'j'] })}] = ei


                        er = args.result.data.real[${symIndex({ arrayName: 'args.result', indices: ['i', 'j'] })}]
                        ei = args.result.data.imag[${symIndex({ arrayName: 'args.result', indices: ['i', 'j'] })}]

                        args.result.data.real[${symIndex({ arrayName: 'args.result', indices: ['i', 'j'] })}] = args.result.data.real[${symIndex({ arrayName: 'args.result', indices: ['ii', 'j'] })}]
                        args.result.data.imag[${symIndex({ arrayName: 'args.result', indices: ['i', 'j'] })}] = args.result.data.imag[${symIndex({ arrayName: 'args.result', indices: ['ii', 'j'] })}]

                        args.result.data.real[${symIndex({ arrayName: 'args.result', indices: ['ii', 'j'] })}] = er
                        args.result.data.imag[${symIndex({ arrayName: 'args.result', indices: ['ii', 'j'] })}] = ei

                    }

                    break
                }
            }

            er = copy.data.real[${symIndex({ arrayName: 'copy', indices: ['i', 'i'] })}]
            ei = copy.data.imag[${symIndex({ arrayName: 'copy', indices: ['i', 'i'] })}]
        }`,

        `for (let j = 0; j < dim; j++) {`,

        assignment.middle({
            withReal: `copy.data.real[${symIndex({ arrayName: 'copy', indices: ['i', 'j'] })}]`,
            withImag: `copy.data.imag[${symIndex({ arrayName: 'copy', indices: ['i', 'j'] })}]`,
            resultReal: `var tempReal`,
            resultImag: `var tempImag`,
        }),

        division.middle({
            ofReal: `tempReal`,
            ofImag: `tempImag`,
            withReal: `er`,
            withImag: `ei`,
            resultReal: `copy.data.real[${symIndex({ arrayName: 'copy', indices: ['i', 'j'] })}]`,
            resultImag: `copy.data.imag[${symIndex({ arrayName: 'copy', indices: ['i', 'j'] })}]`,
        }),


        assignment.middle({
            withReal: `args.result.data.real[${symIndex({ arrayName: 'args.result', indices: ['i', 'j'] })}]`,
            withImag: `args.result.data.imag[${symIndex({ arrayName: 'args.result', indices: ['i', 'j'] })}]`,
            resultReal: `var tempReal`,
            resultImag: `var tempImag`,
        }),

        division.middle({
            ofReal: `tempReal`,
            ofImag: `tempImag`,
            withReal: `er`,
            withImag: `ei`,
            resultReal: `args.result.data.real[${symIndex({ arrayName: 'args.result', indices: ['i', 'j'] })}]`,
            resultImag: `args.result.data.imag[${symIndex({ arrayName: 'args.result', indices: ['i', 'j'] })}]`,
        }),

        `}`,

        `for (let ii = 0; ii < dim; ii++) {`,

        `if (ii == i) { continue; }`,

        `er = copy.data.real[${symIndex({ arrayName: 'copy', indices: ['ii', 'i'] })}]`,
        `ei = copy.data.imag[${symIndex({ arrayName: 'copy', indices: ['ii', 'i'] })}]`,

        `for (let j = 0; j < dim; j++) {`,

        multiplication.middle({
            ofReal: `er`,
            ofImag: `ei`,
            withReal: `copy.data.real[${symIndex({ arrayName: 'copy', indices: ['i', 'j'] })}]`,
            withImag: `copy.data.imag[${symIndex({ arrayName: 'copy', indices: ['i', 'j'] })}]`,
            resultReal: `let elimCopyReal`,
            resultImag: `let elimCopyImag`,
        }),

        subtraction.middle({
            ofReal: `copy.data.real[${symIndex({ arrayName: 'copy', indices: ['ii', 'j'] })}]`,
            ofImag: `copy.data.imag[${symIndex({ arrayName: 'copy', indices: ['ii', 'j'] })}]`,
            withReal: `elimCopyReal`,
            withImag: `elimCopyImag`,
            resultReal: `copy.data.real[${symIndex({ arrayName: 'copy', indices: ['ii', 'j'] })}]`,
            resultImag: `copy.data.imag[${symIndex({ arrayName: 'copy', indices: ['ii', 'j'] })}]`,
        }),

        multiplication.middle({
            ofReal: `er`,
            ofImag: `ei`,
            withReal: `args.result.data.real[${symIndex({ arrayName: 'args.result', indices: ['i', 'j'] })}]`,
            withImag: `args.result.data.imag[${symIndex({ arrayName: 'args.result', indices: ['i', 'j'] })}]`,
            resultReal: `let elimResultReal`,
            resultImag: `let elimResultImag`,
        }),

        subtraction.middle({
            ofReal: `args.result.data.real[${symIndex({ arrayName: 'args.result', indices: ['ii', 'j'] })}]`,
            ofImag: `args.result.data.imag[${symIndex({ arrayName: 'args.result', indices: ['ii', 'j'] })}]`,
            withReal: `elimResultReal`,
            withImag: `elimResultImag`,
            resultReal: `args.result.data.real[${symIndex({ arrayName: 'args.result', indices: ['ii', 'j'] })}]`,
            resultImag: `args.result.data.imag[${symIndex({ arrayName: 'args.result', indices: ['ii', 'j'] })}]`,
        }),

        `}`,
        `}`,
        `}`,

        `return args.result`,

    ].join('\n'))
}
