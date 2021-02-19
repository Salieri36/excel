import { capitalize } from './utils'

export class DomListener {
    constructor($root, listeners = []) {
        this.$root = $root
        this.listeners = listeners
    }

    initDomListener() {
        this.listeners.forEach(listener => {
            const method = getMethodName(listener)
            this[method] = this[method].bind(this)
            this.$root.on(listener, this[method])
        })
    }

    removeDomListener() {
        this.listeners.forEach(listener => {
            const method = getMethodName(listener)
            this.$root.off(listener, this[method])
        })
    }
}

function getMethodName(method) {
    return `on${capitalize(method)}`
}
