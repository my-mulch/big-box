
class ElementWiseWorkerSuiteUtils {

    static openLoop(args) {
        let { arrayTag, indexTag, count } = args

        if (!indexTag)
            indexTag = arrayTag

        const loop = new Array()
        for (let i = 0; i < count; i++)
            loop.push(`for(let ${indexTag}${i} = 0; ${indexTag}${i} < ${arrayTag}.header.shape[${i}]; ${indexTag}${i}++){`)

        return loop
    }

    static closeLoop(count) {
        const loopStop = new Array()

        for (let i = 0; i < count; i++)
            loopStop.push(`}`)

        return loopStop
    }

    static defineIndex(args) {
        let { arrayTag, indexTag, count } = args

        if (!indexTag)
            indexTag = arrayTag

        const index = new Array()
        for (let i = 0; i < count; i++)
            index.push(`${indexTag}${i} * ${arrayTag}.header.strides[${i}]`)

        return [`const ${arrayTag}I = ${arrayTag}.header.offset + `, index.join('+')]
    }
}

export const openLoop = ElementWiseWorkerSuiteUtils.openLoop
export const closeLoop = ElementWiseWorkerSuiteUtils.closeLoop
export const defineIndex = ElementWiseWorkerSuiteUtils.defineIndex

