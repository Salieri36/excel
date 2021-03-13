import { ExcelComponent } from '@core/ExcelComponent'
import { defaultTitle } from '../../constants'
import { $ } from '../../core/dom'
import { changeTitleAC } from '../../redux/actions'

export class Header extends ExcelComponent {
    constructor($root, options) {
        super($root, {
            name: 'Header',
            listeners: ['input'],
            ...options
        })
    }
    static className = 'excel__header'

    toHTML() {
        const title = this.store.getState().title || defaultTitle
        return `
            <input type="text" class="input" value="${title}" />
            <div>
                <div class="button">
                    <span class="material-icons">delete</span>
                </div>
                <div class="button">
                    <span class="material-icons">exit_to_app</span>
                </div>
            </div>
        `
    }

    onInput(event) {
        const $target = $(event.target)
        this.$dispatch(changeTitleAC($target.text()))
    }
}
