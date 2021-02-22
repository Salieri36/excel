import { $ } from '@core/dom'

export function resizeHandle($root, event) {
    event.preventDefault()
    const $resizer = $(event.target)
    const $parent = $resizer.closest(`[data-type="resizable"]`)
    const coords = $parent.getCoords()
    const type = $resizer.data.resize
    let value
    const sideProp = type === 'col' ? 'bottom' : 'right'
    $resizer.css({
        opacity: 1,
        [sideProp]: '-5000px'
    })

    onmousemove = (e) => {
        if (type === 'col') {
            const delta = e.pageX - coords.right
            value = coords.width + delta
            $resizer.css({right: -delta + 'px'})
        } else {
            const delta = e.pageY - coords.bottom
            value = coords.height + delta
            $resizer.css({bottom: -delta + 'px'})
        }
    }

    onmouseup = (e) => {
        onmousemove = null
        onmouseup = null
        if (type === 'col') {
            $parent.css({width: value + 'px'})
            $root.findAll(`[data-cell="${$parent.data.cell}"]`)
                .forEach(cell => cell.style.width = value + 'px')
        } else {
            $parent.css({height: value + 'px'})
        }
        $resizer.css({
            opacity: 0,
            right: 0,
            bottom: 0
        })
    }
}
