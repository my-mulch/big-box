import template from './template'

export default function (args) {
    return new Function('args', template({
        al: args.of.header.shape.length,
        bl: args.with.header.shape.length,
        rl: args.result.header.shape.length,
        assignment: 'args.of.data[ai] + args.with.data[bi]'
    }))
}
