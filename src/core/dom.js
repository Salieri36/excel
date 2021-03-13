class Dom {
    constructor(selector) {
        this.$el = typeof selector === 'string'
        ? document.querySelector(selector)
        : selector
    }

    html(html) {
        if (typeof html === 'string') {
            this.$el.innerHTML = html
            return this
        }

        return this.$el.outerHTML
    }

    text(text) {
        if (typeof text !== 'undefined') {
            this.$el.textContent = text
            return this
        }
        if (this.$el.tagName.toLowerCase() === 'input') {
            return this.$el.value.trim()
        }

        return this.$el.textContent.trim()
    }

    clear() {
        this.html('')
        return this
    }

    append(node) {
        if (node instanceof Dom) {
            node = node.$el
        }
        if (Element.prototype.append) {
            this.$el.append(node)
            return this
        } else {
            this.$el.appendChild(node)
            return this
        }
    }

    on(eventName, callback) {
        return this.$el.addEventListener(eventName, callback)
    }

    off(eventName, callback) {
        return this.$el.removeEventListener(eventName, callback)
    }

    get data() {
        return this.$el.dataset
    }

    getCoords() {
        return this.$el.getBoundingClientRect()
    }

    closest(selector) {
        return $(this.$el.closest(selector))
    }

    css(styles = {}) {
        Object.keys(styles).forEach(key => this.$el.style[key] = styles[key])
        return this
    }

    findAll(selector) {
        return document.querySelectorAll(selector)
    }

    find(selector) {
        return $(document.querySelector(selector))
    }

    addClass(className) {
        this.$el.classList.add(className)
        return this
    }

    removeClass(className) {
        this.$el.classList.remove(className)
        return this
    }

    id(parse) {
        if (parse) {
            const parsed = this.id().split(':')
            return {
                row: +parsed[0],
                col: +parsed[1]
            }
        }
        return this.data.id
    }

    focus() {
        this.$el.focus()
        return this
    }

    attr(name, value) {
        if (value) {
            this.$el.setAttribute(name, value)
            return this
        }
        return this.$el.getAttribute(name)
    }

    getStyles(styles = []) {
        return styles.reduce((res, s) => {
            res[s] = this.$el.style[s]
            return res
        }, {})
    }
}

export function $(selector) {
    return new Dom(selector)
}

$.create = (tagName, classes = '') => {
    const el = document.createElement(tagName)
    el.classList.add(classes)
    return $(el)
}
