import React from 'react';
import {NavLink} from 'react-router-dom';

function NavBarLink({to, children}) {
    return <NavLink to={to}>{children}</NavLink>;
}

function NavBar() {
    return (
        <div className='flex flex-col gap-4'>
            <NavBarLink to='home'>Главная</NavBarLink>
            <NavBarLink to='tasks'>Задачи</NavBarLink>
            <NavBarLink to='planning'>Планирование</NavBarLink>
            <NavBarLink to='statictics'>Статистика</NavBarLink>
        </div>
    );
}

export default NavBar;
