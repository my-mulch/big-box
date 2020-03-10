import bb from '../index.mjs'
import jest from './engine.mjs'

export default jest.suite(function () {
    let A, B, C, D, E

    console.log('\n\n-------- Linear Algebra Suite --------\n\n')

    A = bb.tensor([
        [[10], [72], [91], [13]],
        [[57], [44], [49], [33]],
        [[90], [66], [23], [21]]
    ])

    B = bb.tensor([
        [[17], [11], [19]],
        [[41], [15], [11]],
        [[16], [14], [15]]
    ])

    D = bb.tensor([
        [[2], [2], [1]],
        [[4], [2], [6]],
        [[4], [2], [2]]
    ])

    C = bb.tensor([
        [[1]],
        [[2]],
        [[3]]
    ])

    E = bb.tensor([
        [
            [[10], [5], [2]],
            [[72], [6], [3]],
            [[91], [6], [1]],
            [[13], [4], [12]]
        ],

        [
            [[57], [7], [1]],
            [[44], [2], [2]],
            [[49], [8], [4]],
            [[33], [8], [5]]
        ],

        [
            [[90], [2], [5]],
            [[66], [4], [3]],
            [[23], [1], [2]],
            [[21], [2], [2]]
        ]
    ])

    const F = bb.tensor([
        [[72, 91, 13, 57]]
    ])

    const G = bb.tensor([
        [[10, 72, 91, 13]]
    ])








    this.expect(new bb.cached.matMult({ of: F, with: G }).invoke()).toEqual([["-7756.00+1076.00i+9603.00j+8851.00k"]])
    this.expect(new bb.cached.matMult({ of: G, with: F }).invoke()).toEqual([["-7756.00+11112.00i+3761.00j-5839.00k"]])
    this.expect(new bb.cached.matMult({ of: B, with: A }).invoke()).toEqual([["2507.00", "2962.00", "2523.00", "983.00"], ["2255.00", "4338.00", "4719.00", "1259.00"], ["2308.00", "2758.00", "2487.00", "985.00"]])
    this.expect(new bb.cached.matMult({ of: B, with: C }).invoke()).toEqual([["96.00"], ["104.00"], ["89.00"]])
    this.expect(A.T()).toEqual([["10.00", "57.00", "90.00"], ["72.00", "44.00", "66.00"], ["91.00", "49.00", "23.00"], ["13.00", "33.00", "21.00"]])
    this.expect(new bb.cached.inverse({ of: D }).invoke()).toEqual([["-0.50", "-0.13", "0.63"], ["1.00", "0.00", "-0.50"], ["0.00", "0.25", "-0.25"]])
    this.expect(new bb.cached.inverse({ of: [[[6], [4]], [[5], [2]]] }).invoke()).toEqual([["-0.25", "0.50"], ["0.63", "-0.75"]])
    this.expect(new bb.cached.inverse({ of: [[[4], [1], [3], [3]], [[4], [0], [0], [1]], [[2], [3], [4], [2]], [[0], [0], [4], [4]]] }).invoke()).toEqual([["1.50", "-1.00", "-0.50", "-0.63"], ["-5.00", "4.00", "2.00", "1.75"], ["6.00", "-5.00", "-2.00", "-2.25"], ["-6.00", "5.00", "2.00", "2.50"]])
    this.expect(new bb.cached.cross({ of: E.slice(['1:2', 0, ':']).T(), with: C }).invoke()).toEqual([["19.00"], ["-170.00"], ["107.00"]])
    this.expect(new bb.cached.matMult({ of: E.slice([':', 0, ':']), with: C }).invoke()).toEqual([["26.00"], ["74.00"], ["109.00"]])
    this.expect(bb.unit({ of: [[1], [2], [3]] })).toEqual(["0.27", "0.53", "0.80"])

    console.log('\n\n-------- End Linear Algebra Suite --------\n\n')
})
