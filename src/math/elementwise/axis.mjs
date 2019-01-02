
export default radley.suite({
    args: ['$R', '$A', '$mapper', '$reducer'],
    nozzle: js,
    code: `
        { tag: 'RL', type: 'loop' } | @ = 0 ; @ < $R.header.shape[^] ; @++
            { tag: 'AL', type: 'loop' } | @ = 0 ; @ < $A.header.shape[^] ; @++
            
                { tag: 'RL', type: 'assign', op: '+' } | $ri = @ * $R.header.strides[^]
                { tag: 'AL', type: 'assign', op: '+' } | $ai = @ * $A.header.strides[^]

                { type: 'assign' } | $R.data[$ri] = $reducer($mapper($A.data[$ai]), $R.data[$ri])
        
        { type: 'return' } | $R`
})