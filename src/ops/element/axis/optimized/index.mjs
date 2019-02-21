import template from './template'

export const argmax = function (args) {
    return new Function('args', template.call(args, {
        global: 'let argmax, valmax',
        initialize: 'argmax = 0, valmax = Number.NEGATIVE_INFINITY',
        operate: function (element, i) {
            return `if(${element} > valmax) valmax = ${element}, argmax = ${i}`
        },
        assign: 'argmax'
    }))
}

export const argmin = function (args) {
    return new Function('args', `
        let argmin, valmin

        ${new Array(args.result.header.size)
            .fill(null)
            .map(function (_, i) {
                const innerSize = args.of.header.size / args.result.header.size
                const resultIndex = indexifyLongWithAxes.call(args.result, args.axes, 'o', i)
                const ri = indexifyFlat.call(args.result, resultIndex)

                return `
                    argmin = 0, valmin = Number.POSITIVE_INFINITY

                    ${innerElements(args.axes, innerSize, resultIndex, args.of)
                        .map(function (element, i) {
                            return `if(${element} < valmin) valmin = ${element}, argmin = ${i}`
                        }).join('\n')}
                    
                    args.result.data[${ri}] = argmin
                `
            })}
        
        return args.result
    `)
}

import { indexifyLongWithAxes, innerElements } from './utils'

export const a = function (args) {
    return new Function('args', `
        let max

        ${new Array(args.result.header.size)
            .fill(null)
            .map(function (_, i) {
                const innerSize = args.of.header.size / args.result.header.size
                const resultIndex = indexifyLongWithAxes.call(args.result, args.axes, 'o', i)
                const ri = indexifyFlat.call(args.result, resultIndex)

                return `
                    max = Number.NEGATIVE_INFINITY

                    ${innerElements(args.axes, innerSize, resultIndex, args.of)
                        .map(function (element) { return `if(${element} > max) max = ${element}` })
                        .join('\n')}
                    
                    args.result.data[${ri}] = max
                `
            })}
        
        return args.result
    `)
}

export const a = function (args) {
    return new Function('args', `

        ${new Array(args.result.header.size)
            .fill(null)
            .map(function (_, i) {
                const innerSize = args.of.header.size / args.result.header.size
                const resultIndex = indexifyLongWithAxes.call(args.result, args.axes, 'o', i)
                const ri = indexifyFlat.call(args.result, resultIndex)

                return `args.result.data[${ri}] = (${
                    innerElements(args.axes, innerSize, resultIndex, args.of)
                        .join('+')}) / ${innerSize}`
            })}
        
        return args.result
    `)
}

export const a = function (args) {
    return new Function('args', `
        let min

        ${new Array(args.result.header.size)
            .fill(null)
            .map(function (_, i) {
                const innerSize = args.of.header.size / args.result.header.size
                const resultIndex = indexifyLongWithAxes.call(args.result, args.axes, 'o', i)
                const ri = indexifyFlat.call(args.result, resultIndex)

                return `
                    min = Number.POSITIVE_INFINITY

                    ${innerElements(args.axes, innerSize, resultIndex, args.of)
                        .map(function (element) { return `if(${element} < min) min = ${element}` })
                        .join('\n')}
                    
                    args.result.data[${ri}] = min
                `
            })}
        
        return args.result
    `)
}

export const a = function (args) {
    return new Function('args', `

        ${new Array(args.result.header.size)
            .fill(null)
            .map(function (_, i) {
                const innerSize = args.of.header.size / args.result.header.size
                const resultIndex = indexifyLongWithAxes.call(args.result, args.axes, 'o', i)
                const ri = indexifyFlat.call(args.result, resultIndex)

                return `args.result.data[${ri}] = Math.sqrt(${
                    innerElements(args.axes, innerSize, resultIndex, args.of)
                        .map(function (element) { return `${element} * ${element}` })
                        .join('+')})`
            })}
        
        return args.result
    `)
}

export const a = function (args) {
    return new Function('args', `

        ${new Array(args.result.header.size)
            .fill(null)
            .map(function (_, i) {
                const innerSize = args.of.header.size / args.result.header.size
                const resultIndex = indexifyLongWithAxes.call(args.result, args.axes, 'o', i)
                const ri = indexifyFlat.call(args.result, resultIndex)

                return `args.result.data[${ri}] = ${innerElements(
                    args.axes, innerSize, resultIndex, args.of).join('*')}`
            })}
        
        return args.result
    `)
}

export const a = function (args) {
    return new Function('args', `

        ${new Array(args.result.header.size)
            .fill(null)
            .map(function (_, i) {
                const resultIndex = indexifyLongWithAxes.call(args.result, args.axes, 'o', i)
                const ai = indexifyFlat.call(args.of, resultIndex)
                const ri = indexifyFlat.call(args.result, resultIndex)

                return `args.result.data[${ri}] = args.of.data[${ai}].toFixed(args.precision)`
            })}
        
        return args.result
    `)
}

export const a = function (args) {
    return new Function('args', `

        ${new Array(args.result.header.size)
            .fill(null)
            .map(function (_, i) {
                const innerSize = args.of.header.size / args.result.header.size
                const resultIndex = indexifyLongWithAxes.call(args.result, args.axes, 'o', i)
                const ri = indexifyFlat.call(args.result, resultIndex)

                return `args.result.data[${ri}] = ${innerElements(
                    args.axes, innerSize, resultIndex, args.of).join('+')}`
            })}
        
        return args.result
    `)
}

