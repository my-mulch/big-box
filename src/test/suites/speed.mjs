import bb from '../../main/array'
import Complex from 'complex.js'

export default function () {
    console.log('\n\n-------- Speed Suite --------\n\n')

    const bbcs = bb.rand({ shape: [1e7, 1] })
    const jscs = new Array(1e7).fill(null).map(function (_, i) { return Complex(bbcs.data[i * 2], bbcs.data[i * 2 + 1]) })

    var sum = [Complex(0), 0]
    console.time('complex.js - comp')
    for (let i = 0; i < jscs.length; i++) sum[0] = sum[0].add(jscs[i])
    console.timeEnd('complex.js - comp')
    console.log(sum)

    var sum = [0, 0]
    console.time('bb - comp')
    sum[0] = bbcs.sum()
    console.timeEnd('bb - comp')
    console.log(sum)

    var sum = [0, 0]
    console.time('native - comp')
    for (let i = 0; i < 1e7; i++) sum[0] += bbcs.data[i * 2], sum[1] += bbcs.data[i * 2 + 1]
    console.timeEnd('native - comp')
    console.log(sum)


    console.log('\n\n-------- End Speed Suite --------\n\n')
}
