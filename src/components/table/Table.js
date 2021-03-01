import { ExcelComponent } from '@core/ExcelComponent'
import { createTable } from './table.template'
import {
    isCell, matrix, nextSelection, shouldResizing
} from './table.functions'
import { tableResizing } from './table.resize'
import { TableSelection } from './TableSelection'
import { $ } from '../../core/dom'

export class Table extends ExcelComponent {
    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown', 'input'],
            ...options
        })
    }
    static className = 'excel__table'

    toHTML() {
        return createTable()
    }

    prepare() {
        this.selection = new TableSelection()
    }

    init() {
        super.init()
        const $cell = this.$root.find(`[data-id="0:0"]`)
        this.selectCell($cell)
        this.$on('Formula:input', text => {
            this.selection.current.text(text)
        })
        this.$on('Formula:down', () => {
            this.selection.current.focus()
        })
    }

    selectCell($cell) {
        this.selection.select($cell)
        this.$emit('Table:select', $cell)
    }


    onMousedown(event) {
        if (shouldResizing(event)) {
            tableResizing(event, this.$root)
        }
        if (isCell(event)) {
            const $target = $(event.target)
            if (event.shiftKey) {
                const $cells = matrix($target, this.selection.current)
                    .map(id => this.$root.find(`[data-id="${id}"]`))
                    this.selection.selectGroup($cells)
            } else {
                this.selection.select($target)
            }
        }
    }

    onKeydown(event) {
        const keys =
        ['Enter', 'Tab', 'ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft']
        const {key} = event
        if (keys.includes(key) && !event.shiftKey) {
            event.preventDefault()
            const id = this.selection.current.id(true)
            const $next = this.$root
                .find(`${nextSelection(key, id)}`)
            this.selectCell($next)
        }
    }

    onInput(event) {
        this.$emit('Table:input', $(event.target))
    }
}
