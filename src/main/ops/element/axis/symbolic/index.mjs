import template from './template'

export default {
    argmax: function (args) {
        return new Function('args', template.call(args, {
            init: `let valmax = Number.POSITIVE_INFINITY, argmax = 0`,
            reduce: `if(args.of.data[ai] > valmax) { valmax = args.of.data[ai]; argmax = a0 }`,
            assign: 'argmax'
        }))
    },
    argmin: function (args) {
        return new Function('args', template.call(args, {
            init: `let valmin = Number.POSITIVE_INFINITY, argmin = 0`,
            reduce: `if(args.of.data[ai] < valmin) { valmin = args.of.data[ai]; argmin = a0 }`,
            assign: 'argmin'
        }))
    },
    min: function (args) {
        return new Function('args', template.call(args, {
            init: 'let min = Number.POSITIVE_INFINITY',
            reduce: 'min = Math.min(min, args.of.data[ai])',
            assign: 'min'
        }))
    },
    max: function (args) {
        return new Function('args', template.call(args, {
            init: `let max = Number.NEGATIVE_INFINITY`,
            reduce: 'max = Math.max(max, args.of.data[ai])',
            assign: 'max'
        }))
    },
    mean: function (args) {
        return new Function('args', template.call(args, {
            global: `const sizeOfInnerAxes = ${args.of.size / args.result.size}`,
            init: 'let sum = 0',
            reduce: 'sum += args.of.data[ai]',
            assign: 'sum / sizeOfInnerAxes'
        }))
    },
    norm: function (args) {
        return new Function('args', template.call(args, {
            init: 'let sumSquares = 0',
            reduce: 'sumSquares += args.of.data[ai] * args.of.data[ai]',
            assign: 'Math.sqrt(sumSquares)'
        }))
    },
    prod: function (args) {
        return new Function('args', template.call(args, {
            init: 'let prod = 1',
            reduce: 'prod *= args.of.data[ai]',
            assign: 'prod'
        }))
    },
    round: function (args) {
        return new Function('args', template.call(args, {
            assign: 'args.of.data[ai].toFixed(args.precision)'
        }))
    },
    sum: function (args) {
        return new Function('args', template.call(args, {
            init: 'let sum = 0',
            reduce: 'sum += args.of.data[ai]',
            assign: 'sum'
        }))
    },
    cumsum: function (args) {
        return new Function('args', template.call(args, {
            init: `let cumsum = 0, av = a${axis}`,
            reduce: `if(a${axis} <= av) cumsum += args.of.data[ai]`,
            assign: 'cumsum'
        }))
    },
    cumprod: function (args) {
        return new Function('args', template.call(args, {
            init: `let cumprod = 1, av = a${axis}`,
            reduce: `if(a${axis} <= av) cumprod *= args.of.data[ai]`,
            assign: 'cumprod'
        }))
    }
}