
export default radley.suite({
    args: ['$R', '$A', '$B', '$reducer'],
    nozzle: js,
    code: `
        { tag: 'RL', type: 'loop' } | @ = 0 ; @ < $R.header.shape[^] ; @++
                { tag: 'RL', type: 'assign', op: '+' } | $ai = @ * $A.header.strides[^]
                { tag: 'RL', type: 'assign', op: '+' } | $bi = @ * $B.header.strides[^]
                { tag: 'RL', type: 'assign', op: '+' } | $ri = @ * $R.header.strides[^]

                { type: 'assign' } | $R.data[$ri] = $reducer($A.data[$ai], $B.data[$bi])
        
        { type: 'return' } | $R`
})