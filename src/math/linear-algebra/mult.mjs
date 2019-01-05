export default radley.suite({
    meta: function ({ A, B }) { return `${A.header.shape}${B.header.shape}` },
    failover: function ({ A, B }) { return A.header.shape[0] * A.header.shape[1] * B.header.shape[1] > 800 },
    make: function ({ A, B, R }) {
        const source = []

        for (let i = 0; i < R.shape[0]; i++) {
            for (let j = 0; j < R.shape[1]; j++) {
                const mults = []
                for (let k = 0; k < A.shape[1]; k++) {
                    mults.push(` A.header.data[${i * A.shape[1] + k}] * B.header.data[${k * B.shape[1] + j}] `)
                }
                source.push(`R.header.data[${source.length}]=${mults.join(' + ')}`)
            }
        }

        source.push('return R')
        return new Function('A', 'B', 'R', source.join('\n'))
    },
    backup: function ({ A, B, R }) {
        for (let r = 0; r < A.header.shape[0]; r++)
            for (let c = 0; c < B.header.shape[1]; c++)
                for (let s = 0; s < A.header.shape[1]; s++)
                    R.data[r * B.header.shape[1] + c] +=
                        A.data[r * A.header.strides[0] + s * A.header.strides[1] + A.header.offset] *
                        B.data[c * B.header.strides[1] + s * B.header.strides[0] + B.header.offset]
        return R
    }
})
