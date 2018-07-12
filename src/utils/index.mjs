/**
 * 
 * 
 * UTILS FOR MULTI-DIM ARRAYS
 * 
 * 
 * 
 */

export function getDataFromIndex(indices, data, header) {
    return data[
        // index returned
        header.offset + indices.reduce(function (finalIndex, idxValue, i) {
            return finalIndex + idxValue * header.stride[i]
        }, 0)
    ]
}

export function getHeader(indices, oldHeader) {
    const newHeader = JSON.parse(JSON.stringify(oldHeader))

    for (let i = 0, del = 0; i < oldHeader.shape.length; i++) {
        if (indices[i] >= 0) {
            newHeader.offset += oldHeader.stride[i] * indices[i]
            newHeader.stride.splice(i - del, 1)
            newHeader.shape.splice(i - del, 1)
            del++
        }
    }

    return newHeader
}

export function getStride(shape) {
    return shape.reduceRight(function (stride, dim) {
        return [dim * stride[0]].concat(stride)
    }, [1]).slice(1)
}

export function getDataForHeader(data, header) {
    return [...getIndices(header.shape)].map(function (index) {
        return getDataFromIndex(index, data, header)
    })
}

export function helperToString(data, header) {
    const templateArrayString = getTemplateArrayString(header.shape)
    const automaticallyReturningGenerator = autoReturnGenerator(getGenerator(getDataForHeader(data, header)))
    const filledArrayString = templateArrayString.replace(/\[\$\]/g, automaticallyReturningGenerator)

    return formatArrStrLikeNumpy(filledArrayString, header.shape.length)
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

export function* getGenerator(A) {
    yield* A
}

export function getShape(A, shape = []) {
    if (!A.length) return shape

    return getShape(A[0], shape.concat(A.length))
}

export function* getIndices(shape, index = []) {
    for (let i = 0; i < shape[0]; i++) {
        if (shape.length > 1)
            yield* getIndices(shape.slice(1), index.concat(i))
        else
            yield index.concat(i)
    }
}

export function* flatten(A) {
    for (let i = 0; i < A.length; i++) {
        if (Array.isArray(A[i])) yield* flatten(A[i])
        else yield A[i]
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

export function slice(A, index) {
    if (!index.length) return A

    return slice(A[index[0]], index.slice(1))
}

export function create(shape, fill = () => 0) {
    if (!shape.length) return fill()

    return new Array(shape[0]).fill(null).map(function () {
        return create(shape.slice(1), fill)
    })
}

export function cycle(A, n) {
    const copy = [...A]
    return copy.splice(-n % copy.length).concat(copy)
}

export function insert(A, index, value) {
    if (index.length === 1) {
        A[index[0]] = value
        return
    }

    insert(A[index[0]], index.slice(1), value)
}