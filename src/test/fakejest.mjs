
export default class FakeJest {
    static expect(stuff) {
        return {
            equals: function (otherStuff) {
                console.log(JSON.stringify(stuff) === JSON.stringify(otherStuff)
                    ? 'Passed!'
                    : `Failed: expected ${stuff} to equal ${otherStuff}`)
            },

            equalsByReference: function (otherStuff) {
                console.log(stuff === otherStuff
                    ? 'Passed!'
                    : `Failed: expected ${JSON.stringify(otherStuff)} reference to equal ${JSON.stringify(otherStuff)} reference`)
            },

            notEqualsByReference: function (otherStuff) {
                console.log(stuff !== otherStuff
                    ? 'Passed!'
                    : `Failed: expected ${JSON.stringify(stuff)} reference to differ from ${JSON.stringify(otherStuff)} reference`)
            }
        }
    }

}
