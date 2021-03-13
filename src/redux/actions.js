import {
    APPLY_STYLE,
    CHANGE_STYLES,
    CHANGE_TITLE,
    CURRENT_TEXT,
    TABLE_RESIZE
} from './types'

export function tableResizeAC(data) {
    return {
        type: TABLE_RESIZE,
        data
    }
}

export function currentTextAC(data) {
    return {
        type: CURRENT_TEXT,
        data
    }
}

export function changeStyles(data) {
    return {
        type: CHANGE_STYLES,
        data
    }
}

export function applyStyle(data) {
    return {
        type: APPLY_STYLE,
        data
    }
}

export function changeTitleAC(data) {
    return {
        type: CHANGE_TITLE,
        data
    }
}
