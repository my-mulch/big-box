
export const indexTemplate = function (size) {
    const result = []

    for (let r = 0; r < size; r++)
        for (let c = 0; c < size; c++)
            result.push([r, c])

    return result
}
