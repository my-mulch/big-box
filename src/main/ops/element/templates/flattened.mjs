
import { litComp } from './utils'

export default function (operation) {
    return function (args) {
        return new Function('args', [
            operation.begin(args),

            'for(let i = 0; i < this.indices.result.length; i++){',

            operation.middle({
                ofReal: `args.of.data.real[this.indices.of[i]]`,
                ofImag: `args.of.data.imag[this.indices.of[i]]`,

                withReal: `args.with.data.real[this.indices.with[i]]`,
                withImag: `args.with.data.imag[this.indices.with[i]]`,

                resultReal: `args.result.data.real[this.indices.result[i]]`,
                resultImag: `args.result.data.imag[this.indices.result[i]]`,
            }),

            '}',

            operation.end(args),

            'return args.result'

        ].join('\n')).bind({ indices: litComp(args) })
    }
}
