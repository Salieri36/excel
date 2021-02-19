export function capitalize(string) {
    if (typeof string !== 'string') {
        string = ''
    }
    return string.charAt(0).toUpperCase() + string.slice(1)
}
