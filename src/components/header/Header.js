import { ExcelComponent } from '@core/ExcelComponent'
import { defaultTitle } from '../../constants'
import { $ } from '../../core/dom'
import { ActiveRoute } from '../../core/routes/ActiveRoute'
import { changeTitleAC } from '../../redux/actions'

export class Header extends ExcelComponent {
    constructor($root, options) {
        super($root, {
            name: 'Header',
            listeners: ['input', 'click'],
            ...options
        })
    }
    static className = 'excel__header'

    toHTML() {
        const title = this.store.getState().title || defaultTitle
        return `
            <input type="text" class="input" value="${title}" />
            <div>
                <div class="button" data-button="remove">
                    <span class="material-icons" data-button="remove">
                        delete
                    </span>
                </div>
                <div class="button" data-button="exit">
                    <span class="material-icons" data-button="exit">
                        exit_to_app
                    </span>
                </div>
            </div>
        `
    }

    onClick(event) {
        const $target = $(event.target)
        if ($target.data.button === 'remove') {
            const decision = confirm('Do you want delete this table?')
            if (decision) {
                localStorage.removeItem('excel:' + ActiveRoute.param)
                ActiveRoute.navigate('')
            }
        } else if ($target.data.button === 'exit') {
            ActiveRoute.navigate('')
        }
    }

    onInput(event) {
        const $target = $(event.target)
        this.$dispatch(changeTitleAC($target.text()))
    }
}
