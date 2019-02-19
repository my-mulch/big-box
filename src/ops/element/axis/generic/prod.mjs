import template from './template'

export default function (args) {
    return new Function('args', template({
        rl: args.axes[1].length,
        al: args.axes[0].length,
        initial: 'let prod = 1',
        operation: 'prod *= args.of.data[ai]',
        assignment: 'prod'
    }))
}
