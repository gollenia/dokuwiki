import React, { useContext, useEffect, useState } from 'react';
import { store } from '../Editor/services/store';
import NewPage from './NewPage';
import TreeItem from './TreeItem';

import './tree.scss';

declare global {
    interface Window {
        DOKU_ID: string;
        DOKU_LANGS: string[];
    }
}

const TreeView = () => {
    const currentId = window.DOKU_ID ?? '';

    const [tree, setTree] = useState([]);
    const [currentDrag, setCurrentDrag] = useState('');

    const [langMenu, setLangMenu] = useState(false);
    const [search, setSearch] = useState<string>('');
    const [searchResults, setSearchResults] = useState([]);

    const languages = window.DOKU_LANGS ?? [];
    const currentLanguage = window.DOKU_LANG ?? '';

    const globalState = useContext(store);
    const {
        state: { showFileTree },
        dispatch,
    } = globalState;

    useEffect(() => {
        fetch('/?controller=edit&method=tree&current_id=' + currentId)
            .then(response => response.json())
            .then(data => setTree(data));
    }, []);

    useEffect(() => {
        if (search.length < 3) return;
        fetch('/?controller=search&method=get&q=' + search)
            .then(response => response.json())
            .then(data => setSearchResults(data.items));
    }, [search]);

    const triggerReload = () => {
        fetch('/?controller=edit&method=tree&current_id=' + currentId)
            .then(response => response.json())
            .then(data => setTree(data));
    };

    return (
        <div
            className={`sidebar position-fixed bottom-0 left-0 d-flex flex-column flex-shrink-0 p-3 ${
                showFileTree ? '' : 'hidden'
            }`}
        >
            <input
                type="text"
                className="form-control search"
                placeholder="Suche"
                value={search}
                onChange={event => {
                    setSearch(event.target.value);
                }}
            />

            {search.length >= 3 && (
                <ul className="search-results">
                    {searchResults?.map((item, index) => {
                        return (
                            <li key={index}>
                                <a href={'/' + item.id}>
                                    <i className="material-symbols-outlined">draft</i>
                                    <span>{item.title}</span>
                                </a>
                            </li>
                        );
                    })}
                </ul>
            )}

            {search.length < 3 && (
                <ul className={'tree tree-root ' + (currentDrag ? 'drag-ok' : '')}>
                    {tree?.map((item, index) => {
                        return (
                            <TreeItem
                                key={index}
                                currentID={currentId}
                                item={item}
                                currentDrag={currentDrag}
                                setCurrentDrag={setCurrentDrag}
                                triggerReload={triggerReload}
                            />
                        );
                    })}
                </ul>
            )}

            <div className="dropdown py-2 mt-auto">
                <a
                    href="#"
                    className="d-flex gap-2 align-items-center  text-decoration-none dropdown-toggle lang-select"
                    onClick={() => setLangMenu(!langMenu)}
                >
                    <img
                        src={`/lib/tpl/dokuwiki/img/countries/${currentLanguage}.svg`}
                        alt=""
                        width="24"
                        height="24"
                        className="mr-2"
                    />
                    <strong>{languages[currentLanguage]}</strong>
                </a>
                {langMenu && (
                    <ul className="dropdown-menu-dark drop-menu text-small shadow lang-menu">
                        {Object.entries(languages).map(([key, value], index) => {
                            return (
                                <li key={index}>
                                    <a className="dropdown-item" href={'/?lang=' + key}>
                                        <img
                                            src={`/lib/tpl/dokuwiki/img/countries/${key}.svg`}
                                            alt=""
                                            width="24"
                                            height="24"
                                            className="mr-2"
                                        />
                                        {value}
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
            <NewPage />
        </div>
    );
};

export default TreeView;
