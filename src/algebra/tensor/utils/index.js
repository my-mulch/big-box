function* traverse(array, shape, index = []) {
    for (let i = 0; i < shape[0]; i++)
        if (shape.length === 1) yield index.concat(i)
        else yield* traverse(array, shape.slice(1), index.concat(i))
}