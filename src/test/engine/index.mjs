
export default class FakeJest {
    static expect(stuff) {
        return {
            toEqual: function (otherStuff) {
                if (stuff.header) stuff = stuff.round(8).toRawArray()
                if (otherStuff.header) otherStuff = otherStuff.round(8).toRawArray()

                stuff = JSON.stringify(stuff)
                otherStuff = JSON.stringify(otherStuff)
                console.log(stuff === otherStuff
                    ? 'Passed!'
                    : `Failed: expected ${stuff} to equal ${otherStuff}`)
            },

            toEqualByReference: function (otherStuff) {
                console.log(stuff === otherStuff
                    ? 'Passed!'
                    : `Failed: expected ${JSON.stringify(otherStuff)} reference to equal ${JSON.stringify(otherStuff)} reference`)
            },

            toNotEqualByReference: function (otherStuff) {
                console.log(stuff !== otherStuff
                    ? 'Passed!'
                    : `Failed: expected ${JSON.stringify(stuff)} reference to differ from ${JSON.stringify(otherStuff)} reference`)
            }
        }
    }

    static execute(...suites) { suites.map(function (suite) { suite(FakeJest) }) }

}
