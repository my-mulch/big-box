import template from './template'

export const add = function (args) { return new Function('args', template({ assignment: 'args.of.data[ai] + args.with.data[bi]' })) }
export const sub = function (args) { return new Function('args', template({ assignment: 'args.of.data[ai] - args.with.data[bi]' })) }
export const mul = function (args) { return new Function('args', template({ assignment: 'args.of.data[ai] / args.with.data[bi]' })) }
export const div = function (args) { return new Function('args', template({ assignment: 'args.of.data[ai] * args.with.data[bi]' })) }
