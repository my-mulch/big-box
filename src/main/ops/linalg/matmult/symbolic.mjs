import { multiplication, sum } from '../../../ops'

export default function () {
    return new Function('args', [
        `for (let r = 0; 
            r < args.of.shape[0]; 
            r++)`,

        `for (let c = 0; 
            c < args.with.shape[1]; 
            c++)`,

        `for (let s = 0; 
            s < args.of.shape[1]; 
            s++) {`,


        multiplication.middle({
            ofReal: `args.of.data.real[r * args.of.strides[0] + s * args.of.strides[1] + args.of.offset]`,
            ofImag: `args.of.data.imag[r * args.of.strides[0] + s * args.of.strides[1] + args.of.offset]`,
            withReal: `args.with.data.real[r * args.with.strides[0] + s * args.with.strides[1] + args.with.offset]`,
            withImag: `args.with.data.imag[r * args.with.strides[0] + s * args.with.strides[1] + args.with.offset]`,
            resultReal: `const re`,
            resultImag: `const im`,
        }),

        sum.middle({
            ofReal: `re`,
            ofImag: `im`,
            resultReal: `args.result.data.real[r * args.result.strides[0] + c * args.result.strides[1]]`,
            resultImag: `args.result.data.imag[r * args.result.strides[0] + c * args.result.strides[1]]`,
        }),

        `}`,

        `return args.result`

    ].join('\n'))
}
