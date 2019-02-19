import template from './template'

export default function (args) {
    return new Function('args', template(Object.assign({
        assignment: function (ai, bi) {
            return `args.of.data[${ai}] + args.with.data[${bi}]`
        }
    }, args)))
}
