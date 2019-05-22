import '@babel/polyfill'
import 'es6-promise/auto'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store'
import AppRouter from './routes/AppRouter'

import '@/assets/style/main.scss'

const store = configureStore()

const App = () => {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  )
}

setTimeout(() => {
  ReactDOM.render(<App />, document.getElementById('root'))
}, 100)
