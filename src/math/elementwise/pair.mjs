export default radley.suite({
    meta: function ({ A }) { return `${A.header.shape.length}` },
    make: function ({ A, B }) {
        const source = []
        source.push(`let ri = 0`)

        const loops = []
        for (let i = 0; i < A.header.shape.length; i++)
            loops.push(`for(let i${i} = 0; i${i} < A.header.shape[${i}]; i${i}++){`)
        source.push(...loops)

        const aIndex = []
        for (let i = 0; i < A.header.shape.length; i++)
            aIndex.push(`i${i} * A.header.strides[${i}]`)
        source.push(`const ai = ${aIndex.join('+')}`)

        const bIndex = []
        for (let i = 0; i < B.header.shape.length; i++)
            bIndex.push(`i${i} * B.header.strides[${i}]`)
        source.push(`const bi = ${bIndex.join('+')}`)

        source.push(`R.data[ri++] = reducer(A.data[ai], B.data[bi])`)

        source.push(new Array(A.header.shape.length).fill('}').join('\n'))

        source.push(`return R`)
        return new Function('{ A, B, R, reducer }', source.join('\n'))
    }

})
