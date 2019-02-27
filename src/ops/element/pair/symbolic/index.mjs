import template from './template'

const genericReducer = function (operation) { return function (ae, be) { return `${ae}${operation}${be}` } }

export const add = function (args) { return new Function('args', template.call(args, { reducer: genericReducer('+') })) }
export const sub = function (args) { return new Function('args', template.call(args, { reducer: genericReducer('-') })) }
export const mul = function (args) { return new Function('args', template.call(args, { reducer: genericReducer('*') })) }
export const div = function (args) { return new Function('args', template.call(args, { reducer: genericReducer('/') })) }
