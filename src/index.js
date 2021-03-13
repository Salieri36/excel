import { Excel } from './components/excel/Excel'
import { Formula } from './components/formula/Formula'
import { Header } from './components/header/Header'
import { Table } from './components/table/Table'
import { Toolbar } from './components/toolbar/Toolbar'
import { createStor } from './core/createStore'
import { storage, debounce } from './core/utils'
import { initialState } from './redux/initialState'
import { rootReducer } from './redux/rootReducer'
import './scss/index.scss'

const store = createStor(rootReducer, initialState)

const stateListener = debounce(state => {
    storage('table-resize', state)
}, 300)

store.subscribe(stateListener)

const excel = new Excel('#app', {
    components: [Header, Toolbar, Formula, Table],
    store
})

excel.render()
