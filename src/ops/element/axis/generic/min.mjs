import template from './template'

export default function (args) {
    return new Function('args', template({
        rl: args.axes[1].length,
        al: args.axes[0].length,
        initial: 'let min = Number.POSITIVE_INFINITY',
        operation: 'min = Math.min(min, args.of.data[ai])',
        assignment: 'min'
    }))
}
