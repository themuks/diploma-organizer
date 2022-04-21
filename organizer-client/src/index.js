import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter, Link, Navigate, Route, Routes} from 'react-router-dom';
import HomePage from './pages';

ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<App/>}>
                <Navigate to='/home'></Navigate>
                <Route path='/home' element={<HomePage/>}/>
            </Route>
            <Route
                path='*'
                element={
                    <main className='p-4'>
                        <p>Тут ничего нет!</p>
                        <Link to='/home'>Вернуться на домашнюю страницу</Link>
                    </main>
                }
            />
        </Routes>
    </BrowserRouter>,
    document.getElementById('root')
);
