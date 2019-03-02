import template from './template'

const genericOperation = function (operation) {
    return new Function('args', template.call(args, {
        reducer: function (ae, be) { return `${ae}${operation}${be}` }
    }))
}

export const add = genericOperation('+')
export const sub = genericOperation('-')
export const mul = genericOperation('*')
export const div = genericOperation('/')
