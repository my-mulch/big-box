
export const factory = function (template, operation) {
    return function (args) {
        return new Function('args', template.call(args, { operation }))
    }
}

export const add = function ({ a, b, c, d, r, i }) {
    return [
        `${r} = ${a} + ${c}`,
        `${i} = ${b} + ${d}`,
    ].join('\n')
}

export const sub = function ({ a, b, c, d, r, i }) {
    return [
        `${r} = ${a} - ${c}`,
        `${i} = ${b} - ${d}`,
    ].join('\n')
}

export const mul = function ({ a, b, c, d, r, i }) {
    return [
        `var ac = ${a} * ${c}`,
        `var bd = ${b} * ${d}`,
        `var apb = (${a} + ${b})`,
        `var cpd = (${c} + ${d})`,

        `${r} = ac - bd`,
        `${i} = apb * cpd - ac - bd`,
    ].join('\n')
}

export const div = function ({ a, b, c, d, r, i }) {
    return [
        `var mod = ${c} === 0 && ${d} === 0 
            ? 1 
            : ${c} * ${c} + ${d} * ${d}`,

        `${r} = (${a} * ${c} + ${b} * ${d}) / mod`,
        `${i} = (${b} * ${c} - ${a} * ${d}) / mod`,
    ].join('\n')
}

export const assign = function ({ c, d, r, i }) {
    return [
        `${r} = ${c}`,
        `${i} = ${d}`,
    ].join('\n')
}

