
export default function (operation, template) {
    return function (args) {
        return new Function('args', template.call(args, {
            reduce: function (ae, be) {
                return `${ae}${operation}${be}`
            }
        }))
    }
}
