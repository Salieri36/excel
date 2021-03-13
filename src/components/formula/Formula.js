import { ExcelComponent } from '@core/ExcelComponent'
import { $ } from '../../core/dom'

export class Formula extends ExcelComponent {
    constructor($root, options) {
        super($root, {
            name: 'Formula',
            listeners: ['input', 'keydown'],
            subscribe: ['currentText'],
            ...options
        })
    }
    static className = 'excel__formula'

    toHTML() {
        return `
            <div class="info">fx</div>
            <div id="input" class="input"
            contenteditable spellcheck="false"></div>
        `
    }

    init() {
        super.init()
        this.$formula = this.$root.find('#input')
        this.$on('Table:select', $cell => {
            this.$formula.text($cell.data.value)
        })
    }

    storeChanged({currentText}) {
        this.$formula.text(currentText)
    }

    onInput(event) {
        this.$emit('Formula:input', $(event.target).text())
    }

    onKeydown(event) {
        const keys = ['Enter', 'Tab']
        if (keys.includes(event.key)) {
            event.preventDefault()
            this.$emit('Formula:down')
        }
    }
}
