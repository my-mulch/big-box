import template from './template'

export const argmax = function (args) {
    return new Function('args', template.call(args, {
        global: 'let argmax, valmax',
        initialize: 'argmax = 0, valmax = Number.NEGATIVE_INFINITY',
        mapper: function (item) { return `if(${item} > valmax) valmax = ${item}, argmax = ${i}` },
        reducer: function (innerItems) { return innerItems.join('\n') },
        assign: 'argmax'
    }))
}

export const argmin = function (args) {
    return new Function('args', template.call(args, {
        global: 'let argmin, valmin',
        initialize: 'argmin = 0, valmin = Number.POSITIVE_INFINITY',
        mapper: function (item) { return `if(${item} > valmin) valmin = ${item}, argmin = ${i}` },
        reducer: function (innerItems) { return innerItems.join('\n') },
        assign: 'argmin'
    }))
}

export const max = function (args) {
    return new Function('args', template.call(args, {
        global: 'let max',
        initialize: 'max = Number.NEGATIVE_INFINITY',
        mapper: function (item) { return `if(${item} > max) max = ${item}` },
        reducer: function (innerItems) { return innerItems.join('\n') },
        assign: 'max'
    }))
}

export const min = function (args) {
    return new Function('args', template.call(args, {
        global: 'let min',
        initialize: 'min = Number.POSITIVE_INFINITY',
        mapper: function (item) { return `if(${item} < min) min = ${item}` },
        reducer: function (innerItems) { return innerItems.join('\n') },
        assign: 'min'
    }))
}

export const mean = function (args) {
    return new Function('args', template.call(args, {
        global: `let mean; const innerSize = ${args.of.header.size / args.of.result.size}`,
        mapper: function (item) { return item },
        reducer: function (innerItems) { return `mean = (${innerItems.join('+')}) / innerSize` },
        assign: 'mean'
    }))
}

export const norm = function (args) {
    return new Function('args', template.call(args, {
        global: 'let norm',
        mapper: function (item) { return `${item} * ${item}` },
        reducer: function (innerItems) { return `norm = Math.sqrt(${innerItems.join('+')})` },
        assign: 'norm'
    }))
}

export const prod = function (args) {
    return new Function('args', template.call(args, {
        global: 'let prod',
        mapper: function (item) { return item },
        reducer: function (innerItems) { return `prod = ${innerItems.join('*')}` },
        assign: 'prod'
    }))
}

export const round = function (args) {
    return new Function('args', template.call(args, {
        global: 'let rounded',
        mapper: function (item) { return `${item}.toFixed(args.precision)` },
        reducer: function (innerItems) { return `rounded = ${innerItems.toString()}` },
        assign: 'rounded'
    }))
}

export const sum = function (args) {
    return new Function('args', template.call(args, {
        global: 'let sum',
        mapper: function (item) { return item },
        reducer: function (innerItems) { return `sum = ${innerItems.join('+')}` },
        assign: 'sum'
    }))
}

export const cumsum = function (args) {
    let cumIndex = -1
    return new Function('args', template.call(args, {
        global: 'cumsum',
        mapper: function (item) { return item },
        reducer: function (innerItems) {
            cumIndex++
            return `cumsum = ${innerItems.filter(function (_, i) { return i <= cumIndex }).join('+')}`
        },
        assign: 'cumsum'
    }))
}

export const cumprod = function (args) {
    let cumIndex = -1
    return new Function('args', template.call(args, {
        global: 'cumprod',
        mapper: function (item) { return item },
        reducer: function (innerItems) {
            cumIndex++
            return `cumprod = ${innerItems.filter(function (_, i) { return i <= cumIndex }).join('*')}`
        },
        assign: 'cumprod'
    }))
}