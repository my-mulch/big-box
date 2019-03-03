import template from './template'

export default {
    argmax: function (args) {
        return new Function('args', template.call(args, {
            global: 'let argmax, valmax',
            init: 'argmax = 0, valmax = Number.NEGATIVE_INFINITY',
            map: function (item) { return `if(${item} > valmax) valmax = ${item}, argmax = ${i}` },
            reduce: function (innerItems) { return innerItems.join('\n') },
            assign: 'argmax'
        }))
    },
    argmin: function (args) {
        return new Function('args', template.call(args, {
            global: 'let argmin, valmin',
            init: 'argmin = 0, valmin = Number.POSITIVE_INFINITY',
            map: function (item) { return `if(${item} > valmin) valmin = ${item}, argmin = ${i}` },
            reduce: function (innerItems) { return innerItems.join('\n') },
            assign: 'argmin'
        }))
    },
    max: function (args) {
        return new Function('args', template.call(args, {
            global: 'let max',
            init: 'max = Number.NEGATIVE_INFINITY',
            map: function (item) { return `if(${item} > max) max = ${item}` },
            reduce: function (innerItems) { return innerItems.join('\n') },
            assign: 'max'
        }))
    },
    min: function (args) {
        return new Function('args', template.call(args, {
            global: 'let min',
            init: 'min = Number.POSITIVE_INFINITY',
            map: function (item) { return `if(${item} < min) min = ${item}` },
            reduce: function (innerItems) { return innerItems.join('\n') },
            assign: 'min'
        }))
    },
    mean: function (args) {
        return new Function('args', template.call(args, {
            global: `let mean; const innerSize = ${args.of.header.size / args.of.result.size}`,
            map: function (item) { return item },
            reduce: function (innerItems) { return `mean = (${innerItems.join('+')}) / innerSize` },
            assign: 'mean'
        }))
    },
    norm: function (args) {
        return new Function('args', template.call(args, {
            global: 'let norm',
            map: function (item) { return `${item} * ${item}` },
            reduce: function (innerItems) { return `norm = Math.sqrt(${innerItems.join('+')})` },
            assign: 'norm'
        }))
    },
    prod: function (args) {
        return new Function('args', template.call(args, {
            global: 'let prod',
            map: function (item) { return item },
            reduce: function (innerItems) { return `prod = ${innerItems.join('*')}` },
            assign: 'prod'
        }))
    },
    round: function (args) {
        return new Function('args', template.call(args, {
            global: 'let rounded',
            map: function (item) { return `${item}.toFixed(args.precision)` },
            reduce: function (innerItems) { return `rounded = ${innerItems.toString()}` },
            assign: 'rounded'
        }))
    },
    sum: function (args) {
        return new Function('args', template.call(args, {
            global: 'let sum',
            map: function (item) { return item },
            reduce: function (innerItems) { return `sum = ${innerItems.join('+')}` },
            assign: 'sum'
        }))
    },
    cumsum: function (args) {
        let cumIndex = -1
        return new Function('args', template.call(args, {
            global: 'cumsum',
            map: function (item) { return item },
            reduce: function (innerItems) {
                cumIndex++
                return `cumsum = ${innerItems.filter(function (_, i) { return i <= cumIndex }).join('+')}`
            },
            assign: 'cumsum'
        }))
    },
    cumprod: function (args) {
        let cumIndex = -1
        return new Function('args', template.call(args, {
            global: 'cumprod',
            map: function (item) { return item },
            reduce: function (innerItems) {
                cumIndex++
                return `cumprod = ${innerItems.filter(function (_, i) { return i <= cumIndex }).join('*')}`
            },
            assign: 'cumprod'
        }))
    }
}
