import template from './template'

export default function (args) {
    return new Function('args', template({
        rl: args.axes[1].length,
        al: args.axes[0].length,
        initial: `let valmin = Number.POSITIVE_INFINITY, argmin = 0`,
        operation: `if(args.of.data[ai] < valmin) { valmin = args.of.data[ai]; argmin = a0 }`,
        assignment: 'argmin'
    }))
}
