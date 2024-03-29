import React, { useEffect } from "react";
import { createSearchParams, Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../redux/user/selectors";
import * as actions from "../redux/user/actions";

function NavBarNavLink({ to, text }) {
    return <NavLink to={to}>
        {text}
    </NavLink>;
}

function NavBarNavLinkText({ active, text }) {
    return <span
        className={
            active
                ? "block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-gray-300"
                : "block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
        }
    >{text}</span>;
}

function NavBar() {
    const location = useLocation();
    const { t, i18n } = useTranslation();
    const user = useSelector(getUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(actions.fetchUser());
    }, [dispatch, location]);

    const onSearch = (event) => {
        console.log(event);
        navigate({
            pathname: "/app/search", search: createSearchParams({
                query: event.target.value
            }).toString()
        });
    };

    return (
        <header className="bg-white border-b border-gray-200 dark:border-gray-600 px-2 sm:px-4 py-2.5 dark:bg-gray-800">
            <div className="container flex flex-wrap justify-between items-center mx-auto">
                <Link to="/app">
                    {/*<img*/}
                    {/*    className="h-12"*/}
                    {/*    src={`${process.env.PUBLIC_URL}"/images/logo.svg"`}*/}
                    {/*    alt={t("Logo")}*/}
                    {/*></img>*/}
                    <span className="text-4xl font-bold text-blue-600 ml-5">Organizer</span>
                </Link>

                <div
                    className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1">
                    <div className="hidden relative mr-3 md:mr-0 md:block">
                        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                            <svg
                                className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    fillRule="evenodd"
                                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                    clipRule="evenodd"></path>
                            </svg>
                        </div>
                        <input
                            type="search" id="email-address-icon"
                            className="block p-2 pl-10 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-300 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder={t("Search")} onChange={onSearch}/>
                    </div>
                </div>

                <div className="flex items-center md:order-2">
                    <button
                        type="button"
                        className="flex mr-3 text-sm bg-gray-900 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                        id="user-menu-button" aria-expanded="false" data-dropdown-toggle="dropdown">
                        <span className="sr-only">{t("OpenUserMenu")}</span>
                        <FaUser
                            className="w-8 h-8 rounded-full text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"/>
                    </button>
                    <div
                        className="hidden z-50 my-4 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                        id="dropdown">
                        {user && <div className="py-3 px-4">
                            <span
                                className="block text-sm text-gray-900 dark:text-gray-300">{user.name} {user.surname}</span>
                            <span
                                className="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">{user.email}</span>
                        </div>}
                        <ul className="py-1" aria-labelledby="dropdown">
                            <li>
                                <Link
                                    to="/app/profile"
                                    state={{ backgroundLocation: location }}
                                    className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">{t("Profile")}</Link>
                            </li>
                            <li>
                                <Link
                                    to="/app/settings"
                                    state={{ backgroundLocation: location }}
                                    className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">{t("Settings")}</Link>
                            </li>
                            {/*<li className="relative">*/}
                            {/*    <Link*/}
                            {/*        to="/app/upgrade"*/}
                            {/*        state={{ backgroundLocation: location }}*/}
                            {/*        className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">{t("Upgrade")}</Link>*/}
                            {/*    <span className="flex absolute h-3 w-3 top-1/2 right-1 -mt-1.5 mr-3">*/}
                            {/*      <span*/}
                            {/*          className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>*/}
                            {/*      <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>*/}
                            {/*    </span>*/}
                            {/*</li>*/}
                            <li>
                                <Link
                                    to="/logout"
                                    state={{ backgroundLocation: location }}
                                    className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">{t("SignOut")}</Link>
                            </li>
                        </ul>
                    </div>
                    <button
                        data-collapse-toggle="mobile-menu-3" type="button"
                        className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="mobile-menu-3" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg
                            className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                fillRule="evenodd"
                                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                clipRule="evenodd"></path>
                        </svg>
                        <svg
                            className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"></path>
                        </svg>
                    </button>
                </div>
                {/*<div*/}
                {/*    className="hidden justify-between items-center w-full md:flex md:w-auto md:order-2"*/}
                {/*    id="mobile-menu-3">*/}
                {/*    <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">*/}
                {/*        <li>*/}
                {/*            <NavBarNavLink*/}
                {/*                to="/app/dashboard" text={({isActive}) => (*/}
                {/*                <NavBarNavLinkText active={isActive} text={t("Application")}/>*/}
                {/*            )}/>*/}
                {/*        </li>*/}
                {/*    </ul>*/}
                {/*</div>*/}

                <div
                    className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1"
                    id="mobile-menu-3">
                    <div className="relative mt-3 md:hidden">
                        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                            <svg
                                className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    fillRule="evenodd"
                                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                    clipRule="evenodd"></path>
                            </svg>
                        </div>
                        <input
                            type="search" id="email-address-icon"
                            className="block p-2 pl-10 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-300 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder={t("Search")} onChange={onSearch}/>
                    </div>
                </div>
            </div>
        </header>
    )
        ;
}

export default NavBar;
