import template from './template'

export default function (args) {
    return new Function('args', template({
        rl: args.axes[1].length,
        al: args.axes[0].length,
        initial: `let valmax = Number.POSITIVE_INFINITY, argmax = 0`,
        operation: `if(args.of.data[ai] > valmax) { 
            argmax = a0 
            valmax = args.of.data[ai]
        }`,
        assignment: 'argmax'
    }))
}
