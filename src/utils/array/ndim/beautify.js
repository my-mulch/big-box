const { findLocalIndex } = require('./access')

export function wrapperString(wrap, meat) {
    return wrap.split('$').join(meat)
}

export function helperToString(header, index = []) {
    const elements = []
    const entirety = []

    for (let i = 0; i < header.shape[0]; i++) {
        if (header.shape.length === 1) {
            const localIndex = findLocalIndex(index.concat(i), header)
            elements.push(header.array[localIndex])
        } else {
            const newHeader = { ...header, shape: header.shape.slice(1) }
            const subArrStr = helperToString(newHeader, index.concat(i))
            entirety.push(subArrStr)
        }

        if (i + 1 === header.shape[0] && entirety.length) {
            const newLines = '\n'.repeat(header.shape.length - 1)
            return wrapperString('[$]', entirety.join(',' + newLines + '\t'))
        }
    }

    if (elements.length) return wrapperString('[$]', elements.join(', '))
}

