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

    const saveForbidden =
        (article.locked && window.DOKU_USER.acl < 255) || article.title === '' || article.content === '';

    const saveArticle = () => {
        dispatch({ type: 'SET_STATUS', payload: 'SAVING' });
        fetch('/?lang=' + window.DOKU_LANG + '&controller=edit&method=save&id=' + window.DOKU_ID, {
            method: 'POST',
            body: JSON.stringify(article),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then(response => response.json())
            .then(data => {
                dispatch({ type: 'SET_STATUS', payload: 'SAVED' });
                const currentUrl = window.location.href;

                window.location.href = currentUrl.split('/').pop();
            });
    };

    const saveButtonClass = () => {
        switch (status) {
            case 'SAVED':
                return 'btn-saved';
            case 'SAVING':
                return 'btn-warning';
            case 'CHANGED':
                return 'btn-primary';
            case 'ERROR':
                return 'btn-error';
            default:
                return 'btn-secondary';
        }
    };

    const saveButtonText = () => {
        switch (status) {
            case 'SAVED':
                return (
                    <>
                        <i className="material-symbols-outlined font-weight-normal">done</i> Gespeichert
                    </>
                );
            case 'SAVING':
                return (
                    <>
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        <span className="sr-only"> Speichern...</span>
                    </>
                );
            case 'CHANGED':
                return (
                    <>
                        <i className="material-symbols-outlined font-weight-normal">save</i> Speichern
                    </>
                );
            case 'ERROR':
                return (
                    <>
                        <i className="material-symbols-outlined font-weight-normal">warning</i> Speichern
                    </>
                );
            default:
                return <>Speichern</>;
        }
    };

    const deleteArticle = () => {
        if (confirm('Möchten Sie diesen Artikel wirklich löschen?')) {
            fetch('/?lang=' + window.DOKU_LANG + '&controller=edit&method=delete&id=' + window.DOKU_ID)
                .then(response => response.json())
                .then(data => {
                    if (data === 1) {
                        const currentUrl = window.location.href.split(':');
                        currentUrl.pop();
                        const newUrl = currentUrl.join(':');
                        window.location.href = newUrl;
                    }
                });
        }
    };

    console.log(menu);
    return (
        <nav className="navbar position-fixed bg-white navbar-expand-lg shadow-sm navbar-light bg-light">
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
                        <li className="nav-item">
                            <a className="nav-link" aria-current="page" href="/dashboard">
                                Dashboard
                            </a>
                        </li>

                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#">
                                Administration
                            </a>
                            <ul className="drop-menu">
                                {Object.entries(menu.admin).map((item: any, index) => {
                                    return (
                                        <li key={index}>
                                            <a className="dropdown-item" href="/?do=admin&page={{ item.plugin }}">
                                                <i className="material-symbols-outlined">{item.icon}</i> {item.prompt}
                                            </a>
                                        </li>
                                    );
                                })}

                                {Object.entries(menu.admin).map((item: any, index) => {
                                    return (
                                        <li key={index}>
                                            <a className="dropdown-item" href="/?do=admin&page={{ item.plugin }}">
                                                <i className="material-symbols-outlined">{item.icon}</i> {item.prompt}
                                            </a>
                                        </li>
                                    );
                                })}

                                {Object.entries(menu.admin).map((item: any, index) => {
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
                        <div className="d-flex justify-content-end gap-2 py-4 px-4">
                            <button
                                onClick={() => deleteArticle()}
                                disabled={saveForbidden}
                                className="right btn btn-outline-danger"
                            >
                                Löschen
                            </button>
                            <button
                                disabled={(article.locked && window.DOKU_USER.acl < 255) || status == 'SAVING'}
                                className={'right btn ' + saveButtonClass()}
                                onClick={() => saveArticle()}
                            >
                                {saveButtonText()}
                            </button>
                        </div>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Menu;
