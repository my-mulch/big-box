
export const cache = {
    clear: function () {
        this.min = []
        this.max = []
        this.sum = []
        this.norm = []
        this.mean = []
    }
}

export const addition = function ({
    ofRealIndex, ofImagIndex,
    withRealIndex, withImagIndex,
    resultRealIndex, resultImagIndex }) {
    return [
        `${resultRealIndex} = ${ofRealIndex} + ${withRealIndex}`,
        `${resultImagIndex} = ${ofImagIndex} + ${withImagIndex}`,
    ].join('\n')
}

export const subtraction = function ({
    ofRealIndex, ofImagIndex,
    withRealIndex, withImagIndex,
    resultRealIndex, resultImagIndex }) {
    return [
        `${resultRealIndex} = ${ofRealIndex} - ${withRealIndex}`,
        `${resultImagIndex} = ${ofImagIndex} - ${withImagIndex}`,
    ].join('\n')
}

export const multiplication = function ({
    ofRealIndex, ofImagIndex,
    withRealIndex, withImagIndex,
    resultRealIndex, resultImagIndex }) {
    return [
        `var ac = ${ofRealIndex} * ${withRealIndex}`,
        `var bd = ${ofImagIndex} * ${withImagIndex}`,
        `var apb = (${ofRealIndex} + ${ofImagIndex})`,
        `var cpd = (${withRealIndex} + ${withImagIndex})`,

        `${resultRealIndex} = ac - bd`,
        `${resultImagIndex} = apb * cpd - ac - bd`,
    ].join('\n')
}

export const division = function ({
    ofRealIndex, ofImagIndex,
    withRealIndex, withImagIndex,
    resultRealIndex, resultImagIndex }) {
    return [
        `var mod = ${withRealIndex} === 0 && ${withImagIndex} === 0 
            ? 1 
            : ${withRealIndex} * ${withRealIndex} + ${withImagIndex} * ${withImagIndex}`,

        `${resultRealIndex} = (${ofRealIndex} * ${withRealIndex} + ${ofImagIndex} * ${withImagIndex}) / mod`,
        `${resultImagIndex} = (${ofImagIndex} * ${withRealIndex} - ${ofRealIndex} * ${withImagIndex}) / mod`,
    ].join('\n')
}

export const assignment = function ({
    withRealIndex, withImagIndex,
    resultRealIndex, resultImagIndex }) {
    return [
        `${resultRealIndex} = ${withRealIndex}`,
        `${resultImagIndex} = ${withImagIndex}`,
    ].join('\n')
}

export const min = function min({
    ofRealIndex, ofImagIndex,
    resultRealIndex, resultImagIndex }) {

}

export const max = function max({
    ofRealIndex, ofImagIndex,
    resultRealIndex, resultImagIndex }) {

}


export const norm = function ({
    ofRealIndex, ofImagIndex,
    resultRealIndex, resultImagIndex }) {

}

export const mean = function ({
    ofRealIndex, ofImagIndex,
    resultRealIndex, resultImagIndex }) {
    return [
        `this.cache[${resultRealIndex}] += args.of.data[${ofRealIndex}]`,
        `this.cache[${resultImagIndex}] += args.of.data[${ofImagIndex}]`,
    ].join('\n')
}

export const sum = function ({ ofRealIndex, ofImagIndex, resultRealIndex, resultImagIndex }) {

}
