
export const addition = {
    inner: function ({
        ofRealIndex, ofImagIndex,
        withRealIndex, withImagIndex,
        resultRealIndex, resultImagIndex }) {
        return [
            `args.result.data[${resultRealIndex}] = args.of.data[${ofRealIndex}] + args.with.data[${withRealIndex}]`,
            `args.result.data[${resultImagIndex}] = args.of.data[${ofImagIndex}] + args.with.data[${withImagIndex}]`,
        ].join('\n')
    },
    outer: function () { return '' }
}

export const subtraction = {
    inner: function ({
        ofRealIndex, ofImagIndex,
        withRealIndex, withImagIndex,
        resultRealIndex, resultImagIndex }) {
        return [
            `args.result.data[${resultRealIndex}] = args.of.data[${ofRealIndex}] - args.with.data[${withRealIndex}]`,
            `args.result.data[${resultImagIndex}] = args.of.data[${ofImagIndex}] - args.with.data[${withImagIndex}]`,
        ].join('\n')
    },
    outer: function () { return '' }
}

export const multiplication = {
    inner: function ({
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
    outer: function () { return '' }
}

export const division = {
    inner: function ({
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
    outer: function () { return '' }
}

export const assignment = {
    inner: function ({
        withRealIndex, withImagIndex,
        resultRealIndex, resultImagIndex }) {
        return [
            `args.result.data[${resultRealIndex}] = args.with.data[${withRealIndex}]`,
            `args.result.data[${resultImagIndex}] = args.with.data[${withImagIndex}]`,
        ].join('\n')
    },
    outer: function () { return '' }
}

export const min = {
    inner: function min({
        ofRealIndex, ofImagIndex,
        resultRealIndex, resultImagIndex }) {

    },
    outer: function () { return '' }
}

export const max = {
    inner: function max({
        ofRealIndex, ofImagIndex,
        resultRealIndex, resultImagIndex }) {

    },
    outer: function () { return '' }
}


export const norm = {
    inner: function ({
        ofRealIndex, ofImagIndex,
        resultRealIndex, resultImagIndex }) {

    },
    outer: function () { return '' }
}

export const mean = {
    inner: function ({
        ofRealIndex, ofImagIndex,
        resultRealIndex, resultImagIndex }) {
        return [
            `args.result.data[${resultRealIndex}] += args.of.data[${ofRealIndex}]`,
            `args.result.data[${resultImagIndex}] += args.of.data[${ofImagIndex}]`,
        ].join('\n')
    },
    outer: function () {
        return [
            'for (let i = 0; i < args.result.data.length; i++) {',
            '   args.result.data[i] /= args.result.size',
            '}',
        ].join('\n')
    }
}

export const sum = {
    inner: function ({
        ofRealIndex, ofImagIndex,
        resultRealIndex, resultImagIndex }) {

    }, outer: function () { return '' }
}
