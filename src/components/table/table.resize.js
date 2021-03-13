import { $ } from '@core/dom'

export function tableResizing(event, $root) {
    return new Promise(resolve => {
        const $target = $(event.target)
        const $parent = $target.closest(`[data-type="resizable"]`)
        const coords = $parent.getCoords()
        const type = $target.data.resize
        let value
        const sideProps = type === 'col' ? 'bottom' : 'right'
        $target.css({
            opacity: 1,
            [sideProps]: '-5000px'
        })

        onmousemove = (e) => {
            e.preventDefault()
            if (type === 'col') {
                const delta = e.pageX - coords.right
                value = coords.width + delta
                $target.css({right: -delta + 'px'})
            } else {
                const delta = e.pageY - coords.bottom
                value = coords.height + delta
                $target.css({bottom: -delta + 'px'})
            }
        }

        onmouseup = () => {
            onmousemove = null
            onmouseup = null

            if (type === 'col') {
                $parent.css({width: value + 'px'})
                const $cells = $root
                    .findAll(`[data-col="${$parent.data.col}"]`)
                $cells.forEach($cell => $cell.style.width = value + 'px')
            } else {
                $parent.css({height: value + 'px'})
            }
            resolve({
                type,
                value,
                id: $parent.data[type]
            })
            $target.css({
                opacity: 0,
                right: 0,
                bottom: 0
            })
        }
    })
}
