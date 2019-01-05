export const sum = function (a, b) { return a + b }
export const prod = function (a, b) { return a * b }
export const quot = function (a, b) { return a / b }
export const diff = function (a, b) { return a - b }
export const mod = function (a, b) { return a % b }
export const min = function (a, b) { return Math.min(a, b) }
export const max = function (a, b) { return Math.max(a, b) }
export const pow = function (a, b) { return Math.pow(a, b) }

export const mean = function (a, b, i, size) { return i + 1 < size ? a + b : (a + b) / size }
export const norm = function (a, b, i, size) { return i + 1 < size ? a + b : Math.sqrt(a + b) }
