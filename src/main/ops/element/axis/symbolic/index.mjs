import template from './template'

export default {
    min: function (args) {
        return new Function('args', template.call(args, {
            init: 'let min = Number.POSITIVE_INFINITY, re = 0, im = 0',
            reduce: [
                'if(args.of.data[ai] < min) {',
                '   min = args.of.data[ai]',
                '   re = args.of.data[ai]',
                '   im = args.of.data[ai + 1]',
                '}'
            ].join('\n'),
            assign: [
                'args.result.data[ri] = re',
                'args.result.data[ri + 1] = im',
            ].join('\n')
        }))
    },
    max: function (args) {
        return new Function('args', template.call(args, {
            init: 'let max = Number.NEGATIVE_INFINITY, re = 0, im = 0',
            reduce: [
                'if(args.of.data[ai] > max) {',
                '   max = args.of.data[ai]',
                '   re = args.of.data[ai]',
                '   im = args.of.data[ai + 1]',
                '}'
            ].join('\n'),
            assign: [
                'args.result.data[ri] = re',
                'args.result.data[ri + 1] = im',
            ].join('\n')
        }))
    },
    mean: function (args) {
        return new Function('args', template.call(args, {
            global: `const sizeOfInnerAxes = ${args.of.size / args.result.size}`,
            init: 'let resum = 0, imsum = 0',
            reduce: [
                'resum += args.of.data[ai]',
                'imsum += args.of.data[ai + 1]'
            ].join('\n'),
            assign: [
                'args.result.data[ri] = resum / sizeOfInnerAxes',
                'args.result.data[ri + 1] = imsum / sizeOfInnerAxes',
            ].join('\n')
        }))
    },
    norm: function (args) {
        return new Function('args', template.call(args, {
            init: 'let sumSquares = 0',
            reduce: 'sumSquares += args.of.data[ai] * args.of.data[ai] + args.of.data[ai + 1] * args.of.data[ai + 1]',
            assign: 'args.result.data[ri] = Math.sqrt(sumSquares)'
        }))
    },
    sum: function (args) {
        return new Function('args', template.call(args, {
            init: 'let resum = 0, imsum = 0',
            reduce: [
                'resum += args.of.data[ai]',
                'imsum += args.of.data[ai + 1]'
            ].join('\n'),
            assign: [
                'args.result.data[ri] = resum',
                'args.result.data[ri + 1] = imsum',
            ].join('\n')
        }))
    },
}
