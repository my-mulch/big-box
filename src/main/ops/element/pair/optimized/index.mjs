import template from './template'

const genericOperation = function (operation) {
    return function (args) {
        return new Function('args', template.call(args, {
            reduce: function (ae, be) { return `${ae}${operation}${be}` }
        }))
    }
}


export default {
    add: genericOperation('+'),
    subtract: genericOperation('-'),
    multiply: genericOperation('*'),
    divide: genericOperation('/')
}
