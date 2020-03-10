
export default class Source {
    constructor(code = []) { this.chain = code.join('\n') }

    nestedFor(axes, shapes, statements) {
        this.chain += axes
            .map(function (_, i) {
                const a = `i${axes[i]}`
                const s = `${shapes[i]}`

                return `for(let ${a} = 0;${a} < ${s};${a}++){`
            }, this)
            .concat(statements)
            .concat(['}'.repeat(axes.length)])
            .join('\n')

        return this
    }

    for(init, check, delta) {
        this.chain += `for (${init}; ${check}; ${delta})`

        return this
    }

    let(name) {
        this.chain += `let ${name}`

        return this
    }

    plus(value) {
        this.chain += `+ ${value} `

        return this
    }

    const(name) {
        this.chain += `const ${name}`

        return this
    }

    equals(value) {
        this.chain += ` = ${value} `

        return this
    }

    if(condition) {
        this.chain += `if (${condition})`

        return this
    }

    elseIf(condition) {
        this.chain += `else if (${condition})`

        return this
    }

    then(statements) {
        this.chain += ['{', ...statements, '}'].join('\n')

        return this
    }

    else(statements) {
        this.chain += ['else {', ...statements, '}'].join('\n')

        return this
    }

    toString() { return this.chain }
}
