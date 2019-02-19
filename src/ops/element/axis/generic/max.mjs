import template from './template'

export default function (args) {
    return new Function('args', template({
        rl: args.axes[1].length,
        al: args.axes[0].length,
        initial: `let max = Number.NEGATIVE_INFINITY`,
        operation: 'max = Math.max(max, args.of.data[ai])',
        assignment: 'max'
    }))
}
