import { ExcelComponent } from '@core/ExcelComponent'
import { createTable } from './table.template'
import {
    isCell, matrix, nextSelection, shouldResizing
} from './table.functions'
import { tableResizing } from './table.resize'
import { TableSelection } from './TableSelection'
import { $ } from '../../core/dom'
import * as actions from '../../redux/actions'
import { defaultStyles } from '../../constants'
import { parse } from '../../core/parse'

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
        return createTable(25, this.store.getState())
    }

    prepare() {
        this.selection = new TableSelection()
    }

    init() {
        super.init()
        const $cell = this.$root.find(`[data-id="0:0"]`)
        this.selectCell($cell)
        this.$on('Formula:input', value => {
            this.selection.current
                .attr('data-value', value)
                .text(parse(value))
            this.updateTextInStore(value)
        })
        this.$on('Formula:down', () => {
            this.selection.current.focus()
        })
        this.$on('toolbar:applyStyle', value => {
            this.selection.applyStyle(value)
            this.$dispatch(actions.applyStyle({
                value,
                ids: this.selection.selectedIds
            }))
        })
    }

    selectCell($cell) {
        this.selection.select($cell)
        this.$emit('Table:select', $cell)
        const styles = $cell.getStyles(Object.keys(defaultStyles))
        this.$dispatch(actions.changeStyles(styles))
    }

    async tableResize(event) {
        try {
            const data = await tableResizing(event, this.$root)
            this.$dispatch(actions.tableResizeAC(data))
        } catch (e) {
            console.warn('Resize error:', e.message)
        }
    }


    onMousedown(event) {
        if (shouldResizing(event)) {
            this.tableResize(event)
        }
        if (isCell(event)) {
            const $target = $(event.target)
            if (event.shiftKey) {
                const $cells = matrix($target, this.selection.current)
                    .map(id => this.$root.find(`[data-id="${id}"]`))
                    this.selection.selectGroup($cells)
            } else {
                this.selectCell($target)
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

    updateTextInStore(value) {
        this.$dispatch(actions.currentTextAC({
            id: this.selection.current.id(),
            value
        }))
    }

    onInput(event) {
        this.updateTextInStore($(event.target).text())
    }
}
