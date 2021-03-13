import { toInlineStyles } from '@core/utils'
import { defaultStyles } from '../../constants'
import { parse } from '../../core/parse'

const CODES = {A: 65, Z: 90}
const colsCount = CODES.Z - CODES.A + 1
const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24

export function createTable(rowsCount = 20, state = {}) {
    const rows = []
    function toChar(_, index) {
        return String.fromCharCode(CODES.A + index)
    }
    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(createColumn(state))
        .join('').trim()
    rows.push(createRow(null, cols))

    for (let i = 0; i < rowsCount; i++) {
        const cells = new Array(colsCount)
            .fill('')
            .map(createCell(i, state))
            .join('')
        rows.push(createRow(i + 1, cells, state))
    }
    return rows.join('')
}

function getWidth(index) {
    if (!index) {
        return `width: ${DEFAULT_WIDTH}px`
    }
    return `width: ${index}px`
}

function getHeight(index) {
    if (!index) {
        return `height: ${DEFAULT_HEIGHT}px`
    }
    return `height: ${index}px`
}

function createRow(index, content, state) {
    const height = state
    ? getHeight(state.rowState[index])
    : DEFAULT_HEIGHT + 'px'
    const resize = index
    ? `<div class="row-resize"  data-resize="row"></div>`
    : ''
    return `
        <div class="row" data-type="resizable"
        style="${height}" data-row="${index}">
            <div class="row-info">
                ${index ? index : '' }
                ${resize}
            </div>
            <div class="row-data">${content}</div>
        </div>
    `
}

function createColumn(state) {
    return function(content, index) {
        const width = getWidth(state.colState[index])
        return `
            <div class="column" data-type="resizable"
            data-col="${index}" style="${width}">
                ${content}
                <div class="col-resize" data-resize="col"></div>
            </div>
        `
    }
}

function createCell(row, state) {
    return function(_, index) {
        const id = `${row}:${index}`
        const value = state.dataState[id]
        const width = getWidth(state.colState[index])
        const styles = toInlineStyles({
            ...defaultStyles,
            ...state.stylesState[id]
        })
        return `
            <div class="cell" contenteditable data-col="${index}"
            data-id="${id}"
            data-value="${value || ''}"
            data-type="cell" style="${styles}; ${width}">
                ${parse(value) || ''}
            </div>
        `
    }
}
