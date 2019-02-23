import { litindex } from '../utils'
import { RESULT, OF, WITH } from '../../../../contants'

export default function (args) {
    return `
        ${resultAssign(this, function (i) {
            return `
                args.result.data[${litindex(this, RESULT, i)}] = ${args.assignment(
                    litindex(this, OF, i),
                    litindex(this, WITH, i)
                )}
            `
        })}

        return args.result
    `
}