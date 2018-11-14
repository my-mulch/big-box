
export default class FakeJest {
    static expect(stuff) {
        return {
            equals: function (otherStuff) {
                console.log(
                    JSON.stringify(stuff) === JSON.stringify(otherStuff)
                        ? 'Passed!'
                        : 'Failed'
                )
            }
        }
    }
}
