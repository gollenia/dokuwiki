import React, { useContext } from 'react';
import { store } from '../Editor/services/store';

type Props = {};

declare global {
    interface Window {
        DOKU_MENU: any;
    }
}

const Menu = (props: Props) => {
    const menu = window.DOKU_MENU;

    const globalState = useContext(store);
    const {
        state: { article, status },
        dispatch,
    } = globalState;

    return (
        <nav className="navbar position-fixed bg-white navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li>
                            <a
                                className="nav-link"
                                href="#"
                                onClick={() => {
                                    dispatch({ type: 'SHOW_FILETREE', payload: !globalState.state.showFileTree });
                                }}
                            >
                                <i className="material-symbols-outlined">menu</i>
                            </a>
                        </li>
                        <li className="nav-item dropdown">
                            <ul className="dropdown-menu  end-0 ">
                                <li>
                                    <a className="dropdown-item" href="/?do=profile">
                                        Profil
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="/?do=logout&sectok={{tpl_sectok()}}">
                                        Logout
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <a className={`nav-link`} aria-current="page" href="/dashboard">
                                Dashboard
                            </a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" aria-current="page" href="/">
                                Seiten
                            </a>
                        </li>

                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#">
                                Administration
                            </a>
                            <ul className="drop-menu">
                                {Object.entries(menu.admin).map(([key, item]: Array<any>, index) => {
                                    return (
                                        <li key={index}>
                                            <a className="dropdown-item" href="/?do=admin&page={{ item.plugin }}">
                                                <i className="material-symbols-outlined">{item.icon}</i> {item.prompt}
                                            </a>
                                        </li>
                                    );
                                })}
                            </ul>
                        </li>

                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#">
                                Einstellungen
                            </a>
                            <ul className="drop-menu">
                                <li>
                                    <a className="dropdown-item" href="/system/menu">
                                        <i className="material-symbols-outlined">menu_open</i> Menü bearbeiten
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="/system/footer">
                                        <i className="material-symbols-outlined">video_label</i> Footer bearbeiten
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="/system/tags">
                                        <i className="material-symbols-outlined">label</i> Tags
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="/system/categories">
                                        <i className="material-symbols-outlined">inventory_2</i> Kategorien
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="/system/organizations">
                                        <i className="material-symbols-outlined">savings</i> Organisationen
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle profile" href="#">
                                <img src={'https://www.gravatar.com/avatar/' + window.DOKU_USER.hash} />{' '}
                            </a>
                            <ul className="drop-menu">
                                <div>{window.DOKU_USER.fullname}</div>
                                <li>
                                    <a className="nav-link" href="/?do=logout&sectok={{tpl_sectok()}}">
                                        <i className="material-symbols-outlined">logout</i> Abmelden
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="nav-link inspector-toggle"
                                onClick={() => {
                                    dispatch({ type: 'SHOW_INSPECTOR', payload: !globalState.state.showInspector });
                                }}
                            >
                                <i className="material-symbols-outlined">
                                    {globalState.state.showInspector ? 'right_panel_close' : 'right_panel_open'}
                                </i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Menu;
