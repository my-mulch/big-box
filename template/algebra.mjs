
export default class Algebra {
    static split(o1 = [], o2 = []) {
        return [
            o1.slice(0, o1.length / 2), o1.slice(o1.length / 2),
            o2.slice(0, o2.length / 2), o2.slice(o2.length / 2),
        ]
    }

    static match(o1, o2) {
        const maxLen = Math.max(o1.length, o2.length)

        o1.length = maxLen
        o2.length = maxLen

        return [
            Array.from(o1, function (value) { return value || 0 }),
            Array.from(o2, function (value) { return value || 0 })
        ]
    }

    static variable({ symbol, size, index }) {
        return new Array(size).fill(null).map(function (_, i) {
            return `${symbol}[${index}+${i}]`
        })
    }

    static ONE(size) { return new Array(size).fill(1) }
    static ZERO(size) { return new Array(size).fill(0) }
    static POSITIVE_INFINITY(size) { return Array(size).fill(Number.POSITIVE_INFINITY) }
    static NEGATIVE_INFINITY(size) { return Array(size).fill(Number.NEGATIVE_INFINITY) }

    static noop(o1, o2) {
        [o1, o2] = Algebra.match(o1, o2)

        if (o1.length === 1) return [`(${o1})`]

        const [a, b, c, d] = Algebra.split(o1, o2)

        return [Algebra.noop(a, c), Algebra.noop(b, d)].flat(Number.POSITIVE_INFINITY)
    }

    static exp(o1) {
        if (o1.length === 1)
            return [`Math.exp(${o1})`]

        const [a, b] = Algebra.split(o1)

        if (o1.length === 2)
            return Algebra.scale([Algebra.cos(b), Algebra.sin(b)], Algebra.exp(a))

        return [Algebra.exp(a), Algebra.exp(b)].flat(Number.POSITIVE_INFINITY)
    }

    static sin(o1) {
        if (o1.length === 1) return [`Math.sin(${o1})`]

        const [a, b] = Algebra.split(o1)

        return [Algebra.sin(a), Algebra.sin(b)].flat(Number.POSITIVE_INFINITY)
    }

    static cos(o1) {
        if (o1.length === 1) return [`Math.cos(${o1})`]

        const [a, b] = Algebra.split(o1)

        return [Algebra.cos(a), Algebra.cos(b)].flat(Number.POSITIVE_INFINITY)
    }

    static lessThan(o1, o2) {
        [o1, o2] = Algebra.match(o1, o2)

        if (o1.length === 1) return [`(${o1}<${o2})`]

        const [a, b, c, d] = Algebra.split(o1, o2)

        return [Algebra.lessThan(a, c), Algebra.lessThan(b, d)].flat(Number.POSITIVE_INFINITY)
    }

    static greaterThan(o1, o2) {
        [o1, o2] = Algebra.match(o1, o2)

        if (o1.length === 1) return [`(${o1}>${o2})`]

        const [a, b, c, d] = Algebra.split(o1, o2)

        return [Algebra.greaterThan(a, c), Algebra.greaterThan(b, d)].flat(Number.POSITIVE_INFINITY)
    }

    static add(o1, o2) {
        [o1, o2] = Algebra.match(o1, o2)

        if (o1.length === 1) return [`(${o1}+${o2})`]

        const [a, b, c, d] = Algebra.split(o1, o2)

        return [Algebra.add(a, c), Algebra.add(b, d)].flat(Number.POSITIVE_INFINITY)
    }

    static subtract(o1, o2) {
        [o1, o2] = Algebra.match(o1, o2)

        if (o1.length === 1) return [`(${o1}-${o2})`]

        const [a, b, c, d] = Algebra.split(o1, o2)

        return [Algebra.subtract(a, c), Algebra.subtract(b, d)].flat(Number.POSITIVE_INFINITY)
    }

    static multiply(o1, o2) {
        [o1, o2] = Algebra.match(o1, o2)

        if (o1.length === 1) return [`${o1}*${o2}`]

        const [a, b, c, d] = Algebra.split(o1, o2)

        return [
            Algebra.subtract(
                Algebra.multiply(a, c),
                Algebra.multiply(Algebra.conjugate(d), b)
            ),
            Algebra.add(
                Algebra.multiply(d, a),
                Algebra.multiply(b, Algebra.conjugate(c))
            )
        ].flat(Number.POSITIVE_INFINITY)
    }

    static divide(result, o1, o2) {
        [o1, o2] = Algebra.match(o1, o2)

        if (o1.length === 1) return [`${result}=(${o1}/${o2})`]

        return [
            `var mod = (1/${Algebra.sum(Algebra.square(o2))})`,
            Algebra.assign(
                result,
                Algebra.scale(Algebra.multiply(o1, Algebra.conjugate(o2)), 'mod'))
        ].join('\n')
    }

    static squareRoot(o1) {
        if (o1.length === 1) return [`Math.sqrt(${o1})`]

        const [a, b] = Algebra.split(o1)

        return [Algebra.squareRoot(a), Algebra.squareRoot(b)].flat(Number.POSITIVE_INFINITY)
    }

    static sum(o1) {
        if (o1.length === 1) return [`(${o1})`]

        const [a, b] = Algebra.split(o1)

        return Algebra.add(Algebra.sum(a), Algebra.sum(b))
    }

    static scale(o1, c) {
        if (o1.length === 1) return [`(${o1}*${c})`]

        const [a, b] = Algebra.split(o1)

        return [Algebra.scale(a, c), Algebra.scale(b, c)].flat(Number.POSITIVE_INFINITY)
    }

    static square(o1) {
        if (o1.length === 1) return [`(${o1}*${o1})`]

        const [a, b] = Algebra.split(o1)

        return [Algebra.square(a), Algebra.square(b)].flat(Number.POSITIVE_INFINITY)
    }

    static conjugate(o1) {
        if (o1.length === 1) return [`(${o1})`]

        const [a, b] = Algebra.split(o1)

        return [Algebra.conjugate(a), Algebra.negate(b)].flat(Number.POSITIVE_INFINITY)
    }

    static negate(o1) {
        if (o1.length === 1) return [`-(${o1})`]

        const [a, b] = Algebra.split(o1)

        return [Algebra.negate(a), Algebra.negate(b)].flat(Number.POSITIVE_INFINITY)
    }

    static assign(o1, o2, type = '=') {
        if (o1.length === 1) return [`${o1}${type}${o2}`]

        const [a, b, c, d] = Algebra.split(o1, o2)

        return [Algebra.assign(a, c, type), Algebra.assign(b, d, type)].flat(Number.POSITIVE_INFINITY)
    }
}
