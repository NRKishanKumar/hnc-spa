import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import configureStore from './redux/configureStore'
import App from './components/App/index'
import GlobalStyles from "./styles/global";
// Create a fresh store 
const store = configureStore()

render(
  <Provider store={store} >
      <GlobalStyles/>
      <App />
  </Provider>,
  document.querySelector('#app')
)
