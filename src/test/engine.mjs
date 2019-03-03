const FAIL = '\x1b[31m%s\x1b[0m'
const PASS = '\x1b[32m%s\x1b[0m'

export default class Jest {
    static expect(stuff) {
        return {
            toEqual: function (otherStuff) {
                if (stuff.header) stuff = JSON.parse(stuff.toString())
                if (otherStuff.header) otherStuff = JSON.parse(otherStuff.toString())

                stuff = JSON.stringify(stuff)
                otherStuff = JSON.stringify(otherStuff)

                if (stuff === otherStuff)
                    console.log(PASS, 'Passed!')
                else
                    console.log(FAIL, `Failed: expected ${stuff} to equal ${otherStuff}`)
            }
        }
    }

}
