import { assignment, multiplication } from '../../../ops'

export default function (args) {
    const rows = args.of.shape[0],
        cols = args.with.shape[1],
        shared = args.of.shape[1]

    return new Function('args', [
        ...[...new Array(rows * cols).keys()].map(function (i) {
            const r = Math.floor(i / cols) % rows
            const c = Math.floor(i / 1) % cols

            const ri = args.result.offset + r * args.result.strides[0] + c * args.result.strides[1]

            return [
                ...[...new Array(shared).keys()].map(function (s) {
                    const oi = r * args.of.strides[0] + s * args.of.strides[1] + args.of.offset
                    const wi = c * args.with.strides[1] + s * args.with.strides[0] + args.with.offset

                    return multiplication.middle({
                        ofReal: `args.of.data.real[${oi}]`,
                        ofImag: `args.of.data.imag[${oi}]`,
                        withReal: `args.with.data.real[${wi}]`,
                        withImag: `args.with.data.imag[${wi}]`,
                        resultReal: `var sr${s}`,
                        resultImag: `var si${s}`,
                    })
                }),

                assignment.middle({
                    withReal: [...new Array(shared).keys()].map(function (s) { return `sr${s}` }).join('+'),
                    withImag: [...new Array(shared).keys()].map(function (s) { return `si${s}` }).join('+'),
                    resultReal: `args.result.data.real[${ri}]`,
                    resultImag: `args.result.data.imag[${ri}]`,
                })
            ].join('\n')

        }),


        `return args.result`

    ].join('\n'))
}
