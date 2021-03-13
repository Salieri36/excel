export function parse(value = '') {
    if (value.startsWith('=')) {
        debugger
        return eval(value.slice(1))
    }
    return value
}
