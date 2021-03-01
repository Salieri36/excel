export class TableSelection {
    constructor(group = []) {
        this.group = group
        this.current = null
    }

    clear() {
        this.group.forEach($el => $el.removeClass('selected'))
        this.group = []
    }

    select($el) {
        this.clear()
        this.group.push($el)
        $el.focus().addClass('selected')
        this.current = $el
    }

    selectGroup(group = []) {
        this.clear()
        this.group = group
        this.group.forEach($el => $el.addClass('selected'))
    }
}
