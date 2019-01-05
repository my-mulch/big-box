export default radley.suite({
    meta: function ({ A, R }) { return `${A.header.shape.length}${R.header.shape.length}` },
    make: function ({ A, R }) {
        const source = []

        const aLoops = []
        for (let i = 0; i < A.header.shape.length; i++)
            aLoops.push(`for(let a${i} = 0; a${i} < A.header.shape[${i}]; a${i}++){`)
        source.push(...aLoops)

        const rLoops = []
        for (let i = 0; i < R.header.shape.length; i++)
            rLoops.push(`for(let r${i} = 0; r${i} < R.header.shape[${i}]; r${i}++){`)
        source.push(...rLoops)

        const aIndex = []
        for (let i = 0; i < A.header.shape.length; i++)
            aIndex.push(`a${i} * A.header.strides[${i}]`)
        source.push(`const ai = ${aIndex.join('+')}`)

        const rIndex = []
        for (let i = 0; i < R.header.shape.length; i++)
            rIndex.push(`r${i} * R.header.strides[${i}]`)
        source.push(`const ri = ${rIndex.join('+')}`)

        source.push(`R.data[ri] = reducer(mapper(A.data[ai]), R.data[ri])`)

        source.push(new Array(A.header.shape.length).fill('}').join('\n'))
        source.push(new Array(R.header.shape.length).fill('}').join('\n'))

        source.push(`return R`)

        return new Function('{ A, R, mapper, reducer }', source.join('\n'))
    }

})
