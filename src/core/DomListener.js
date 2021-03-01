import { capitalize } from './utils'

export class DomListener {
    constructor($root, listeners = []) {
        this.$root = $root
        this.listeners = listeners
    }

    initDomListeners() {
        this.listeners.forEach(listener => {
            const method = getMethodName(listener)
            this[method] = this[method].bind(this)
            this.$root.on(listener, this[method])
        })
    }

    removeDomListeners() {}
}

function getMethodName(method) {
    return `on${capitalize(method)}`
}
