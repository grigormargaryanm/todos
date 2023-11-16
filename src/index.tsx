import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from "react-redux";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {setupStore} from "./redux/configureStore";
import Todos from './pages/Todos';
import './index.css';
import 'swiper/css';

const store = setupStore();

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Todos/>}/>
            </Routes>
        </BrowserRouter>
    </Provider>
);
