
const args = { axes: Array.from('XooXo') }
const AXIS_INNER_CHARACTER = 'X'
const RESULT = 'result'
const INNER = 'of'

console.log(symfun(args))



function loop(array) {
    return function (i, j) {
        return `for(let a${i} = 0; a${i} < args.${array}.header.shape[${i}]; a${i}++){`
    }
}

function index(array) {
    return function (i, j) {
        return `a${i} * args.${array}.header.strides[${j}]`
    }
}

function symindex(axes, array) {
    return `args.${array}.header.offset + ${axes.map(index(array)).join(' + ')}`
}

function symloops(axes, array, body) {
    return `${axes.map(loop(array)).join('\n')} 
                ${body} 
            ${'}'.repeat(axes.length)}`
}


function split(axes) {
    const raxes = [], iaxes = [], aaxes = [...axes.keys()]

    for (let i = 0; i < axes.length; i++)
        axes[i] === AXIS_INNER_CHARACTER ? iaxes.push(i) : raxes.push(i)

    return [raxes, iaxes, aaxes]
}

function symfun(args) {
    const [raxes, iaxes, aaxes] = split(args.axes)

    return `
        ${args.global || ''}
        
        ${symloops(raxes, RESULT, `
            const ri = ${symindex(raxes, RESULT)}
            ${args.initialize || ''}
            
            ${symloops(iaxes, INNER, `
                const ai = ${symindex(aaxes, INNER)}
                ${args.reducer || ''}
            `)}
            
            args.result.data[ri] = ${args.assign}
        `)}
            
        return args.result
    `
}
