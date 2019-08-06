import { multiplication, subtraction } from '../../../ops'

export default {
    cross: {
        'true': function (args) {
            const ofStrides = args.of.shape[0] === 3 ? args.of.strides[0] : args.of.strides[1]
            const withStrides = args.with.shape[0] === 3 ? args.with.strides[0] : args.with.strides[1]
            const resultStrides = args.result.shape[0] === 3 ? args.result.strides[0] : args.result.strides[1]

            return new Function('args', [
                /** First element of cross */
                multiplication.middle({
                    ofReal: `args.of.data[${1 * ofStrides + args.of.offset}]`,
                    ofImag: `args.of.data[${1 * ofStrides + args.of.offset + 1}]`,
                    withReal: `args.with.data[${2 * withStrides + args.with.offset}]`,
                    withImag: `args.with.data[${2 * withStrides + args.with.offset + 1}]`,
                    resultReal: `const cr00`,
                    resultImag: `const ci00`,
                }),

                multiplication.middle({
                    ofReal: `args.of.data[${2 * ofStrides + args.of.offset}]`,
                    ofImag: `args.of.data[${2 * ofStrides + args.of.offset + 1}]`,
                    withReal: `args.with.data[${1 * withStrides + args.with.offset}]`,
                    withImag: `args.with.data[${1 * withStrides + args.with.offset + 1}]`,
                    resultReal: `const cr01`,
                    resultImag: `const ci01`,
                }),

                subtraction.middle({
                    ofReal: `cr00`,
                    ofImag: `ci00`,
                    withReal: `cr01`,
                    withImag: `ci01`,
                    resultReal: `args.result.data[${args.result.offset + 0 * resultStrides}]`,
                    resultImag: `args.result.data[${args.result.offset + 0 * resultStrides + 1}]`
                }),

                /** Second element of cross */
                multiplication.middle({
                    ofReal: `args.of.data[${2 * ofStrides + args.of.offset}]`,
                    ofImag: `args.of.data[${2 * ofStrides + args.of.offset + 1}]`,
                    withReal: `args.with.data[${0 * withStrides + args.with.offset}]`,
                    withImag: `args.with.data[${0 * withStrides + args.with.offset + 1}]`,
                    resultReal: `const cr10`,
                    resultImag: `const ci10`,
                }),

                multiplication.middle({
                    ofReal: `args.of.data[${0 * ofStrides + args.of.offset}]`,
                    ofImag: `args.of.data[${0 * ofStrides + args.of.offset + 1}]`,
                    withReal: `args.with.data[${2 * withStrides + args.with.offset}]`,
                    withImag: `args.with.data[${2 * withStrides + args.with.offset + 1}]`,
                    resultReal: `const cr11`,
                    resultImag: `const ci11`,
                }),

                subtraction.middle({
                    ofReal: `cr10`,
                    ofImag: `ci10`,
                    withReal: `cr11`,
                    withImag: `ci11`,
                    resultReal: `args.result.data[${args.result.offset + 1 * resultStrides}]`,
                    resultImag: `args.result.data[${args.result.offset + 1 * resultStrides + 1}]`
                }),

                /** Third element of cross */
                multiplication.middle({
                    ofReal: `args.of.data[${0 * ofStrides + args.of.offset}]`,
                    ofImag: `args.of.data[${0 * ofStrides + args.of.offset + 1}]`,
                    withReal: `args.with.data[${1 * withStrides + args.with.offset}]`,
                    withImag: `args.with.data[${1 * withStrides + args.with.offset + 1}]`,
                    resultReal: `const cr20`,
                    resultImag: `const ci20`,
                }),

                multiplication.middle({
                    ofReal: `args.of.data[${1 * ofStrides + args.of.offset}]`,
                    ofImag: `args.of.data[${1 * ofStrides + args.of.offset + 1}]`,
                    withReal: `args.with.data[${0 * withStrides + args.with.offset}]`,
                    withImag: `args.with.data[${0 * withStrides + args.with.offset + 1}]`,
                    resultReal: `const cr21`,
                    resultImag: `const ci21`,
                }),

                subtraction.middle({
                    ofReal: `cr20`,
                    ofImag: `ci20`,
                    withReal: `cr21`,
                    withImag: `ci21`,
                    resultReal: `args.result.data[${args.result.offset + 2 * resultStrides}]`,
                    resultImag: `args.result.data[${args.result.offset + 2 * resultStrides + 1}]`
                }),

                `return args.result`
            ].join('\n'))
        }
    }
}
