
export default class Jest {
    static expect(stuff) {
        return {
            toEqual: function (otherStuff) {
                if (stuff.header) stuff = JSON.parse(stuff.toString())
                if (otherStuff.header) otherStuff = JSON.parse(otherStuff.toString())

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

}
