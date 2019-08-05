
const noop = function () { return '' }

export const addition = {
    begin: noop,
    middle: function ({
        ofRealIndex, ofImagIndex,
        withRealIndex, withImagIndex,
        resultRealIndex, resultImagIndex }) {
        return [
            `args.result.data[${resultRealIndex}] = args.of.data[${ofRealIndex}] + args.with.data[${withRealIndex}]`,
            `args.result.data[${resultImagIndex}] = args.of.data[${ofImagIndex}] + args.with.data[${withImagIndex}]`,
        ].join('\n')
    },
    end: noop
}

export const subtraction = {
    begin: noop,
    middle: function ({
        ofRealIndex, ofImagIndex,
        withRealIndex, withImagIndex,
        resultRealIndex, resultImagIndex }) {
        return [
            `args.result.data[${resultRealIndex}] = args.of.data[${ofRealIndex}] - args.with.data[${withRealIndex}]`,
            `args.result.data[${resultImagIndex}] = args.of.data[${ofImagIndex}] - args.with.data[${withImagIndex}]`,
        ].join('\n')
    },
    end: noop
}

export const multiplication = {
    begin: noop,
    middle: function ({
        ofRealIndex, ofImagIndex,
        withRealIndex, withImagIndex,
        resultRealIndex, resultImagIndex }) {
        return [
            `var ac = args.of.data[${ofRealIndex}] * args.with.data[${withRealIndex}]`,
            `var bd = args.of.data[${ofImagIndex}] * args.with.data[${withImagIndex}]`,
            `var apb = (args.of.data[${ofRealIndex}] + args.of.data[${ofImagIndex}])`,
            `var cpd = (args.with.data[${withRealIndex}] + args.with.data[${withImagIndex}])`,

            `args.result.data[${resultRealIndex}] = ac - bd`,
            `args.result.data[${resultImagIndex}] = apb * cpd - ac - bd`,
        ].join('\n')
    },
    end: noop
}

export const division = {
    begin: noop,
    middle: function ({
        ofRealIndex, ofImagIndex,
        withRealIndex, withImagIndex,
        resultRealIndex, resultImagIndex }) {
        return [
            `var mod = args.with.data[${withRealIndex}] === 0 
                && args.with.data[${withImagIndex}] === 0 
            ? 1 
            : args.with.data[${withRealIndex}] * args.with.data[${withRealIndex}] + 
                args.with.data[${withImagIndex}] * args.with.data[${withImagIndex}]`,

            `args.result.data[${resultRealIndex}] = (args.of.data[${ofRealIndex}] * args.with.data[${withRealIndex}] + 
                                                args.of.data[${ofImagIndex}] * args.with.data[${withImagIndex}]) / mod`,

            `args.result.data[${resultImagIndex}] = (args.of.data[${ofImagIndex}] * args.with.data[${withRealIndex}] - 
                                                args.of.data[${ofRealIndex}] * args.with.data[${withImagIndex}]) / mod`,
        ].join('\n')
    },
    end: noop
}

export const assignment = {
    begin: noop,
    middle: function ({
        withRealIndex, withImagIndex,
        resultRealIndex, resultImagIndex }) {
        return [
            `args.result.data[${resultRealIndex}] = args.with.data[${withRealIndex}]`,
            `args.result.data[${resultImagIndex}] = args.with.data[${withImagIndex}]`,
        ].join('\n')
    },
    end: noop
}

export const min = {
    begin: function () {
        return `args.result.data.fill(Number.POSITIVE_INFINITY)`
    },
    middle: function ({
        ofRealIndex, ofImagIndex,
        resultRealIndex, resultImagIndex }) {
        return [
            `if(args.of.data[${ofRealIndex}] < args.result.data[${resultRealIndex}]) {`,
            `   args.result.data[${resultRealIndex}] = args.of.data[${ofRealIndex}]`,
            `   args.result.data[${resultImagIndex}] = args.of.data[${ofImagIndex}]`,
            `}`
        ].join('\n')
    },
    end: noop
}

export const max = {
    begin: function () {
        return `args.result.data.fill(Number.NEGATIVE_INFINITY)`
    },
    middle: function ({
        ofRealIndex, ofImagIndex,
        resultRealIndex, resultImagIndex }) {
        return [
            `if(args.of.data[${ofRealIndex}] > args.result.data[${resultRealIndex}]) {`,
            `   args.result.data[${resultRealIndex}] = args.of.data[${ofRealIndex}]`,
            `   args.result.data[${resultImagIndex}] = args.of.data[${ofImagIndex}]`,
            `}`
        ].join('\n')
    },
    end: noop
}

export const sum = {
    begin: function () {
        return `args.result.data.fill(0)`
    },
    middle: function ({
        ofRealIndex, ofImagIndex,
        resultRealIndex, resultImagIndex }) {
        return [
            `args.result.data[${resultRealIndex}] += args.of.data[${ofRealIndex}]`,
            `args.result.data[${resultImagIndex}] += args.of.data[${ofImagIndex}]`,
        ].join('\n')
    },
    end: noop
}

export const norm = {
    begin: sum.begin,
    middle: function ({
        ofRealIndex, ofImagIndex,
        resultRealIndex, resultImagIndex }) {
        return [
            `args.result.data[${resultRealIndex}] += args.of.data[${ofRealIndex}] * args.of.data[${ofRealIndex}] +
                                                     args.of.data[${ofImagIndex}] * args.of.data[${ofImagIndex}]`,
        ].join('\n')
    },
    end: function () {
        return [
            'for (let i = 0; i < args.result.data.length; i++)',
            '   args.result.data[i] = Math.sqrt(args.result.data[i])',
        ].join('\n')
    }
}

export const mean = {
    begin: sum.begin,
    middle: sum.middle,
    end: function () {
        return [
            'for (let i = 0; i < args.result.data.length; i++)',
            '   args.result.data[i] /= args.meta.axesSize',
        ].join('\n')
    }
}

