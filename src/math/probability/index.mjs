export function randomInt(start = 0, end = 10) {
    return Math.floor(Math.random() * (end - start)) + start
}