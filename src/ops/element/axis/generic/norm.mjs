import template from './template'

export default function (args) {
    return new Function('args', template({
        rl: args.axes[1].length,
        al: args.axes[0].length,
        initial: 'let sumSquares = 0',
        operation: 'sumSquares += args.of.data[ai] * args.of.data[ai]',
        assignment: 'Math.sqrt(sumSquares)'
    }))
}
