
export const randint = function ({ low, high }) {
    return low + Math.floor(Math.random() * (high - low))
}
