
class Operation {
    constructor(operation) {
        const [full, header, title, args, body] = operation
            .toString()
            .match(/(function)\s*([\s\S]+)\(([\s\S]+)\){([\s\S]+)}/)

        this.args = args
        this.title = title
        this.operation = operation
        this.symbolic = new Function(this.args, `${body.replace(/[ab+-/]/g, function (variable) {


        })}`)
    }
}
export const assign = function (a, b) { return b }
assign.symbolic = function (a, b) { return `${b}` }