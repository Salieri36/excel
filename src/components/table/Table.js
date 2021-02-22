import { ExcelComponent } from '@core/ExcelComponent'
import { shouldResize } from './table.functions'
import { resizeHandle } from './table.resize'
import { createTable } from './table.template'

export class Table extends ExcelComponent {
    constructor($root) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown']
        })
    }
    static className = 'excel__table'

    toHTML() {
        return createTable()
    }

    onMousedown(event) {
        if (shouldResize(event)) {
            resizeHandle(this.$root, event)
        }
    }
}
