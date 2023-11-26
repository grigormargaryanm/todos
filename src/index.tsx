import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { store, persistor } from './redux/configureStore'
import { PersistGate } from 'redux-persist/integration/react'
import Todos from './pages/Todos'
import './index.css'
import 'swiper/css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Todos />} />
        </Routes>
      </BrowserRouter>
    </PersistGate>
  </Provider>,
)
