const FAIL = '\x1b[31m%s\x1b[0m'
const PASS = '\x1b[32m%s\x1b[0m'

export default class Jest {
    static expect(stuff) {
        return {
            toEqual: function (otherStuff) {
                if (stuff.header) stuff = stuff.toRaw()
                if (otherStuff.header) otherStuff = otherStuff.toRaw()

                stuff = stuff.constructor !== String
                    ? JSON.stringify(stuff)
                    : stuff

                otherStuff = otherStuff.constructor !== String
                    ? JSON.stringify(otherStuff)
                    : otherStuff

                if (stuff == otherStuff)
                    console.log(PASS, 'Passed!')
                else
                    console.log(FAIL, `Failed: expected ${stuff} to equal ${otherStuff}`)
            }
        }
    }

}
