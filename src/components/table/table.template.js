const CODES = {A: 65, Z: 90}
const colsCount = CODES.Z - CODES.A + 1

export function createTable(rowsCount = 25) {
    const rows = []
    function toChar(_, index) {
        return String.fromCharCode(CODES.A + index)
    }
    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(createCol)
        .join('').trim()
    rows.push(createRow(null, cols))

    for (let i = 0; i < rowsCount; i++) {
        const cells = new Array(colsCount)
            .fill('')
            .map(createCell(i))
            .join('')
        rows.push(createRow(i + 1, cells))
    }
    return rows.join('')
}

function createRow(index, content) {
    const resize = index
    ? `<div class="row-resize"  data-resize="row"></div>`
    : ''
    return `
        <div class="row" data-type="resizable">
            <div class="row-info">
                ${index ? index : '' }
                ${resize}
            </div>
            <div class="row-data">${content}</div>
        </div>
    `
}

function createCol(content, index) {
    return `
        <div class="column" data-type="resizable" data-col="${index}">
            ${content}
            <div class="col-resize" data-resize="col"></div>
        </div>
    `
}

function createCell(row) {
    return function(_, index) {
        return `
            <div class="cell" contenteditable data-col="${index}"
            data-id="${row}:${index}" data-type="cell"></div>
        `
    }
}
