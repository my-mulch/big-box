
export default radley.suite({
    args: ['R', 'A', 'mapper', 'reducer'],
    meta: function ({ R, A }) {
        return `
            RL.repeat.${R.header.shape.length},
            AL.repeat.${A.header.shape.length},
        `
    },
    nozzle: js,
    code: `
        @ = 0 ; @ < R.header.shape[^] ; @++                             | RL 
            @ = 0 ; @ < A.header.shape[^] ; @++                         | AL 
                ri = @ * R.header.strides[^]                            | RL 
                ai = @ * A.header.strides[^]                            | AL 
                R.data[ri] = reducer(mapper(A.data[ai]), R.data[ri])    |
        return R                                                        |`
})