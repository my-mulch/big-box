import template from './template'

export default function (args) {
    return new Function('args', template({
        axes: args.axes,
        initial: '',
        operation: '',
        assignment: 'args.of.data[ai].toFixed(args.precision)'
    }))
}
