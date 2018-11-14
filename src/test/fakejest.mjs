
export default class FakeJest {
    static expect(stuff) {
        return {
            equals: function (otherStuff) {
                stuff = JSON.stringify(stuff)
                otherStuff = JSON.stringify(otherStuff)
                console.log(stuff === otherStuff ? 'Passed!' : `Failed: expected ${stuff} to equal ${otherStuff}`)
            }
        }
    }
}
