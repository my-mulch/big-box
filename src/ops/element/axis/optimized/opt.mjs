
const axes = Array.from('XXooXo')

function split(axes) {
    const raxes = [], iaxes = [], aaxes = [...axes.keys()]

    for (let i = 0; i < axes.length; i++)
        axes[i] === 'X' ? iaxes.push(i) : raxes.push(i)

    return [raxes, iaxes, aaxes]
}

const [raxes, iaxes, aaxes] = split(axes)

function assign() {
    
}

const source = ``

console.log(source)