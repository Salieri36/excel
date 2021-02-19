const CODES = {A: 65, Z: 90}
const colsCount = CODES.Z - CODES.A + 1

export function createTable(countRows = 25) {
    const rows = []
    function toChar(_, index) {
        return String.fromCharCode(CODES.A + index)
    }
    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(toCollumn)
        .join('')

    rows.push(createRow(null, cols))
    for (let i = 0; i < colsCount; i++) {
        const cells = new Array(colsCount)
            .fill('')
            .map(toCell)
            .join('')
        rows.push(createRow(i + 1, cells))
    }
    return rows.join('')
}

function createRow(index, content) {
    return `
        <div class="row">
            <div class="row-info">${index ? index : ''}</div>
            <div class="row-data">${content}</div>
        </div>
    `
}

function toCollumn(content) {
    return `
        <div class="column">${content}</div>
    `
}

function toCell() {
    return `
        <div class="cell" contenteditable></div>
    `
}
