
function randomInt(start, end) {
    return Math.floor(Math.random() * (end - start)) + start
}

function* randomArray(start, end, length) {
    for (let i = 0; i < length; i++)
        yield randomInt(start, end)
}

module.exports = {
    randomInt,
    randomArray
}
