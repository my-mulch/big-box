import { sum, multiplication } from '../../../ops'

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
                        ofReal: `args.of.data[${oi}]`,
                        ofImag: `args.of.data[${oi + 1}]`,
                        withReal: `args.with.data[${wi}]`,
                        withImag: `args.with.data[${wi + 1}]`,
                        resultReal: `var sr${s}`,
                        resultImag: `var si${s}`,
                    })
                }),

                sum.middle({
                    ofReal: [...new Array(shared).keys()].map(function (s) { return `sr${s}` }).join('+'),
                    ofImag: [...new Array(shared).keys()].map(function (s) { return `si${s}` }).join('+'),
                    resultReal: `args.result.data[${ri}]`,
                    resultImag: `args.result.data[${ri + 1}]`,
                })
            ].join('\n')

        }),


        `return args.result`

    ].join('\n'))
}
