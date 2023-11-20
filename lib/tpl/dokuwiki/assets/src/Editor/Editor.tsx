import React, { useContext, useEffect } from 'react';
import { IntlProvider } from 'react-intl';
import TextEditor from './components/CodeMirror/TextEditor';
import FileManager from './components/FileManager/FileManager';
import Inspector from './components/Inspector';
import MediaManager from './components/MediaManager/MediaManager';
import { Site } from './services/models/Site';
import User from './services/models/User';
import { store } from './services/store';

import useTranslation from './services/useTranslation';

declare global {
    interface Window {
        DOKU_ID: string;
        DOKU_SITE: Site;
        DOKU_USER: User;
        DOKU_BREADCRUMBS: any;
    }
}

const Editor = () => {
    const currentLanguage = window.DOKU_LANG;

    const globalState = useContext(store);
    const {
        state: { article, showFileTree, showInspector },
        dispatch,
    } = globalState;

    const messages = useTranslation(currentLanguage);

    useEffect(() => {
        dispatch({ type: 'SET_SITE', payload: window.DOKU_SITE });
        fetch('/?controller=page&edit=true&lang=' + window.DOKU_LANG + '&id=' + window.DOKU_ID)
            .then(response => response.json())
            .then(data => {
                dispatch({ type: 'SET_ARTICLE', payload: data });
                dispatch({ type: 'SET_FILES', payload: data.files });
                dispatch({ type: 'SET_BIBLEREFS', payload: data.bibleRefs });
            });
        fetch('/?controller=media&method=sectok')
            .then(response => response.json())
            .then(data => {
                window.localStorage.setItem('sectok', data);
            });
    }, []);

    const breadcrumbs = window.DOKU_BREADCRUMBS;

    console.log('breadcrumbs', breadcrumbs);

    const classes = ['edit', showFileTree ? 'show-file-tree' : '', showInspector ? 'show-inspector' : ''].join(' ');

    return (
        <IntlProvider locale={currentLanguage} defaultLocale="en" messages={messages}>
            <div className={classes}>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        {breadcrumbs.map((item: any, index: number) => {
                            const active = index + 1 === breadcrumbs.length;
                            const classes = `breadcrumb-item ${active ? 'active' : ''}`;

                            return (
                                <li key={index} className={classes}>
                                    <a href={item.link}>{item.title}</a>
                                </li>
                            );
                        })}
                    </ol>
                </nav>
                <div className="edit-wrapper">
                    <div className="input-text my-4">
                        <label className="label">Titel</label>
                        <input
                            disabled={article.locked}
                            className="w-100 form-control form-control-lg"
                            value={article.title}
                            onChange={event =>
                                dispatch({
                                    type: 'SET_ARTICLE_DATA',
                                    payload: event.target.value,
                                    key: 'title',
                                })
                            }
                        />
                    </div>
                    <div className="">
                        <TextEditor />

                        <MediaManager />
                        <FileManager />
                    </div>
                </div>
                <Inspector />
            </div>
        </IntlProvider>
    );
};

export default Editor;
