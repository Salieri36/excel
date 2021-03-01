import { ExcelComponent } from '@core/ExcelComponent'

export class Header extends ExcelComponent {
    constructor($root, options) {
        super($root, {
            name: 'Header',
            ...options
        })
    }
    static className = 'excel__header'

    toHTML() {
        return `
            <input type="text" class="input" value="New table" />
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
}
