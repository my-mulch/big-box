/**
 * 
 * 
 * UTILS FOR MULTI-DIM ARRAYS
 * 
 * 
 * 
 */

export function getDataFromIndex(indices, ndArray) {
    return ndArray.data[
        // index returned
        ndArray.header.offset + indices.reduce(function (finalIndex, idxValue, i) {
            return finalIndex + idxValue * ndArray.header.stride[i]
        }, 0)
    ]
}

export function getDataForHeader(ndArray) {
    return [...getIndices(ndArray.header.shape)].map(function (index) {
        return getDataFromIndex(index, ndArray)
    })
}

export function helperToString(ndArray) {
    const templateArrayString = getTemplateArrayString(ndArray.header.shape)
    const automaticallyReturningGenerator = autoReturnGenerator(getGenerator(getDataForHeader(ndArray)))
    const filledArrayString = templateArrayString.replace(/\[\$\]/g, automaticallyReturningGenerator)

    return formatArrStrLikeNumpy(filledArrayString, ndArray.header.shape.length)
}

export function formatArrStrLikeNumpy(arrStr, depth) {
    while (--depth > 0) {
        const find = stringSandwhich(']', ',', '[', [depth, 1, depth])
        const replace = stringSandwhich(']', '\n', '[', [depth, depth, depth])
        arrStr = arrStr.replace(new RegExp(escapeRegExp(find), 'g'), replace)
    }

    return arrStr
}

export function stringSandwhich(bottom, meat, top, quantities) {
    return bottom.repeat(quantities[0]) +
        meat.repeat(quantities[1]) +
        top.repeat(quantities[2])
}

export function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

export function escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

export function helperArange(args) {
    // [start], end, [step] //
    if (args.length === 1)
        return [...getIntegerRange(0, args[0], 1)]
    if (args.length === 2)
        return [...getIntegerRange(args[0], args[1], 1)]
    if (args.length === 3)
        return [...getIntegerRange(args[0], args[1], args[2])]
}

/**
 * 
 * 
 * UTILS FOR RAW JAVASCRIPT ARRAYS
 * 
 * 
 * 
 */

export function* getIntegerRange(start, end, step) {
    while (start < end) {
        yield start
        start += step
    }
}

export function autoReturnGenerator(generator) {
    return function autoReturner() {
        return generator.next().value
    }
}

export function* getGenerator(rawArray) {
    yield* rawArray
}

export function getShape(rawArray, shape = []) {
    if (!rawArray.length) return shape

    return getShape(rawArray[0], shape.concat(rawArray.length))
}

export function* getIndices(shape, index = []) {
    for (let i = 0; i < shape[0]; i++) {
        if (shape.length > 1)
            yield* getIndices(shape.slice(1), index.concat(i))
        else
            yield index.concat(i)
    }
}

export function* flatten(rawArray) {
    for (let i = 0; i < rawArray.length; i++) {
        if (Array.isArray(rawArray[i]))
            yield* flatten(rawArray[i])
        else
            yield rawArray[i]
    }
}

export function getTemplateArrayString(shape) {
    return shape.reduce(function (template, dimension) {
        return template
            .replace(/\$/g, new Array(dimension)
                .fill("[$]")
                .join(","))
    }, "[$]")
}

export function slice(rawArray, index) {
    if (!index.length) return rawArray

    return slice(rawArray[index[0]], index.slice(1))
}

export function create(shape, fill = () => 0) {
    if (!shape.length) return fill()

    return new Array(shape[0]).fill(null).map(function () {
        return create(shape.slice(1), fill)
    })
}

export function cycle(rawArray, n) {
    const copy = [...rawArray]
    return copy.splice(-n % copy.length).concat(copy)
}

export function insert(rawArray, index, value) {
    if (index.length === 1) {
        rawArray[index[0]] = value
        return
    }

    insert(rawArray[index[0]], index.slice(1), value)
}