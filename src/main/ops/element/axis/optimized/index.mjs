import template from './template'

export default {
    max: function (args) {
        return new Function('args', template.call(args, {
            global: 'let max, re, im',
            init: 'max = Number.NEGATIVE_INFINITY, re = 0, im = 0',
            mapper: function (reidx, imidx) {
                return [
                    `if(args.of.data[${reidx}] > max) {`,
                    `   max = args.of.data[${reidx}]`,
                    `   re = args.of.data[${reidx}]`,
                    `   im = args.of.data[${imidx}]`,
                    `}`
                ].join('\n')
            },
            reducer: function (items) { return items.join('\n') },
            assigner: function (reidx, imidx) {
                return [
                    `args.result.data[${reidx}] = re`,
                    `args.result.data[${imidx}] = im`,
                ].join('\n')
            }
        }))
    },
    min: function (args) {
        return new Function('args', template.call(args, {
            global: 'let min, re, im',
            init: 'min = Number.POSITIVE_INFINITY, re = 0, im = 0',
            mapper: function (reidx, imidx) {
                return [
                    `if(args.of.data[${reidx}] < min) {`,
                    `   min = args.of.data[${reidx}]`,
                    `   re = args.of.data[${reidx}]`,
                    `   im = args.of.data[${imidx}]`,
                    `}`
                ].join('\n')
            },
            reducer: function (items) { return items.join('\n') },
            assigner: function (reidx, imidx) {
                return [
                    `args.result.data[${reidx}] = re`,
                    `args.result.data[${imidx}] = im`,
                ].join('\n')
            }
        }))
    },
    mean: function (args) {
        return new Function('args', template.call(args, {
            global: `let remean, immean; const innerSize = ${args.of.size / args.result.size}`,
            mapper: function (reidx, imidx) {
                return [
                    `args.of.data[${reidx}]`,
                    `args.of.data[${imidx}]`
                ]
            },
            reducer: function (innerItems) {
                const real = innerItems.map(function ([real, _]) { return real })
                const imag = innerItems.map(function ([_, imag]) { return imag })

                return [
                    `remean = (${real.join('+')}) / innerSize`,
                    `immean = (${imag.join('+')}) / innerSize`,
                ].join('\n')
            },
            assigner: function (reidx, imidx) {
                return [
                    `args.result.data[${reidx}] = remean`,
                    `args.result.data[${imidx}] = immean`,
                ].join('\n')
            }
        }))
    },
    norm: function (args) {
        return new Function('args', template.call(args, {
            global: 'let norm',
            mapper: function (reidx, imidx) {
                return `
                    args.of.data[${reidx}] * args.of.data[${reidx}] + 
                    args.of.data[${imidx}] * args.of.data[${imidx}]
                `
            },
            reducer: function (innerItems) { return `norm = Math.sqrt(${innerItems.join('+')})` },
            assigner: function (reidx, _) { return `args.result.data[${reidx}] = norm` }
        }))
    },
    sum: function (args) {
        return new Function('args', template.call(args, {
            global: 'let resum, imsum',
            mapper: function (reidx, imidx) {
                return [
                    `args.of.data[${reidx}]`,
                    `args.of.data[${imidx}]`
                ]
            },
            reducer: function (innerItems) {
                const real = innerItems.map(function ([real, _]) { return real })
                const imag = innerItems.map(function ([_, imag]) { return imag })

                return [
                    `resum = (${real.join('+')})`,
                    `imsum = (${imag.join('+')})`,
                ].join('\n')
            },
            assigner: function (reidx, imidx) {
                return [
                    `args.result.data[${reidx}] = resum`,
                    `args.result.data[${imidx}] = imsum`,
                ].join('\n')
            }
        }))
    }
}
