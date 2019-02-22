import template from './template'

export const argmax = function (args) {
    return new Function('args', template.call(args, {
        initialize: `let valmax = Number.POSITIVE_INFINITY, argmax = 0`,
        operate: `if(args.of.data[ai] > valmax) { valmax = args.of.data[ai]; argmax = a0 }`,
        assign: 'argmax'
    }))
}

export const argmin = function (args) {
    return new Function('args', template.call(args, {
        initialize: `let valmin = Number.POSITIVE_INFINITY, argmin = 0`,
        operate: `if(args.of.data[ai] < valmin) { valmin = args.of.data[ai]; argmin = a0 }`,
        assign: 'argmin'
    }))
}

export const min = function (args) {
    return new Function('args', template.call(args, {
        initialize: 'let min = Number.POSITIVE_INFINITY',
        operate: 'min = Math.min(min, args.of.data[ai])',
        assign: 'min'
    }))
}

export const max = function (args) {
    return new Function('args', template.call(args, {
        initialize: `let max = Number.NEGATIVE_INFINITY`,
        operate: 'max = Math.max(max, args.of.data[ai])',
        assign: 'max'
    }))
}

export const mean = function (args) {
    return new Function('args', template.call(args, {
        global: `const sizeOfInnerAxes = ${args.of.header.size / args.result.header.size}`,
        initialize: 'let sum = 0',
        operate: 'sum += args.of.data[ai]',
        assign: 'sum / sizeOfInnerAxes'
    }))
}

export const norm = function (args) {
    return new Function('args', template.call(args, {
        initialize: 'let sumSquares = 0',
        operate: 'sumSquares += args.of.data[ai] * args.of.data[ai]',
        assign: 'Math.sqrt(sumSquares)'
    }))
}

export const prod = function (args) {
    return new Function('args', template.call(args, {
        initialize: 'let prod = 1',
        operate: 'prod *= args.of.data[ai]',
        assign: 'prod'
    }))
}

export const round = function (args) {
    return new Function('args', template.call(args, {
        assign: 'args.of.data[ai].toFixed(args.precision)'
    }))
}

export const sum = function (args) {
    return new Function('args', template.call(args, {
        initialize: 'let sum = 0',
        operate: 'sum += args.of.data[ai]',
        assign: 'sum'
    }))
}

export const cumsum = function (args) {
    return new Function('args', template.call(args, {
        initialize: `let cumsum = 0, av = a${axis}`,
        operate: `if(a${axis} <= av) cumsum += args.of.data[ai]`,
        assign: 'cumsum'
    }))
}

export const cumprod = function (args) {
    return new Function('args', template.call(args, {
        initialize: `let cumprod = 1, av = a${axis}`,
        operate: `if(a${axis} <= av) cumprod *= args.of.data[ai]`,
        assign: 'cumprod'
    }))
}
