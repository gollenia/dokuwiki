import React, { useContext } from 'react';
import { store } from '../services/store';
import BibleRef from './BibleRef';
import Combobox from './Elemets/Combobox';
import FileList from './FileManager/FileList';
import Panel from './Panel';
import TagSelector from './TagSelector';

const Inspector = () => {
    const globalState = useContext(store);
    const {
        state: { article, files, site, status },
        dispatch,
    } = globalState;

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
            });
    };

    const saveForbidden =
        (article.locked && window.DOKU_USER.acl < 255) || article.title === '' || article.content === '';

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
                        <i className="material-symbols-outlined font-weight-normal">done</i>Gespeichert
                    </>
                );
            case 'SAVING':
                return (
                    <>
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        <span className="sr-only">Speichern...</span>
                    </>
                );
            case 'CHANGED':
                return (
                    <>
                        <i className="material-symbols-outlined font-weight-normal">save</i>Speichern
                    </>
                );
            case 'ERROR':
                return (
                    <>
                        <i className="material-symbols-outlined font-weight-normal">warning</i>Speichern
                    </>
                );
            default:
                return <>Speichern</>;
        }
    };

    return (
        <div className="inspector">
            <div className="d-flex justify-content-end gap-2 py-4 px-4">
                <button disabled={saveForbidden} className="right btn btn-outline-danger">
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
            <div className="inspector-panels">
                <Panel title="Beitragsbild">
                    {article.pageimage && article.pageimage !== 'error' && (
                        <img
                            onClick={() => {
                                if (article.locked) return;
                                dispatch({ type: 'SHOW_MEDIAMANAGER', payload: 'inspector' });
                            }}
                            className="object-cover w-100 ratio ratio-16x9 cursor-pointer"
                            src={'/_media/' + article.pageimage + '?w=600'}
                        />
                    )}
                    {article.pageimage && article.pageimage === 'error' && (
                        <div
                            onClick={() => {
                                dispatch({ type: 'SHOW_MEDIAMANAGER', payload: 'inspector' });
                            }}
                            className="image-error w-100 ratio ratio-16x9"
                        >
                            <div>
                                <i className="material-symbols-outlined">image_not_supported</i>
                                <span>Bild nicht gefunden</span>
                            </div>
                        </div>
                    )}
                    {!article.pageimage && (
                        <div
                            onClick={() => {
                                dispatch({ type: 'SHOW_MEDIAMANAGER', payload: 'inspector' });
                            }}
                            className="image-empty w-100 ratio ratio-16x9"
                        >
                            <div>
                                <i className="material-symbols-outlined">photo_library</i>
                                <span>Bild aussuchen</span>
                            </div>
                        </div>
                    )}
                    <div className="d-flex mt-2 gap-2">
                        <button
                            disabled={article.locked}
                            className="btn btn-outline-secondary btn-sm d-flex"
                            onClick={() => {
                                dispatch({ type: 'SHOW_MEDIAMANAGER', payload: 'inspector' });
                            }}
                        >
                            <i className="material-symbols-outlined">image</i> Ändern
                        </button>
                        <button
                            disabled={article.locked}
                            className="btn btn-outline-danger btn-sm d-flex"
                            onClick={() => {}}
                        >
                            <i className="material-symbols-outlined">delete</i> Entfernen
                        </button>
                    </div>
                </Panel>

                <Panel title="Dateien" open={true}>
                    <FileList />
                    <div className="d-flex flex-row-reverse mt-4">
                        <button
                            disabled={article.locked}
                            onClick={() => {
                                dispatch({ type: 'SHOW_FILEMANAGER', payload: true });
                            }}
                            className="btn btn-primary btn-sm"
                        >
                            Dateimanager
                        </button>
                    </div>
                </Panel>

                <Panel title="Zusammenfassung">
                    <div className="input-textarea">
                        <textarea
                            onChange={e => {
                                dispatch({ type: 'SET_ARTICLE_DATA', key: 'abstract', payload: e.target.value });
                                dispatch({ type: 'SET_STATUS', payload: 'CHANGED' });
                            }}
                            className="w-full form-control form-control-sm"
                            rows={5}
                            disabled={article.locked}
                            value={article.abstract}
                        ></textarea>
                        <p className="text-xs text-secondary">
                            Die Zusammenfassung wird als Vorschau auf den Karten angezeigt.
                        </p>
                    </div>
                </Panel>

                <Panel title="Taxonomie">
                    <div className="input-text mb-4">
                        <label className="label label-sm">Kategorie</label>
                        <Combobox
                            placeholder={site.categories?.find(category => category.value == article.category)?.label}
                            options={site.categories}
                            disabled={article.locked}
                            onChange={e => {
                                dispatch({ type: 'SET_ARTICLE_DATA', key: 'category', payload: e });
                                dispatch({ type: 'SET_STATUS', payload: 'CHANGED' });
                            }}
                        />
                    </div>

                    <div className="input-text mb-4">
                        <label className="label label-sm">Zielgruppe</label>
                        <Combobox
                            placeholder={site.audience?.find(audience => audience.value == article.audience)?.label}
                            options={site.audience}
                            disabled={article.locked}
                            onChange={e => {
                                dispatch({ type: 'SET_ARTICLE_DATA', key: 'audience', payload: e });
                                dispatch({ type: 'SET_STATUS', payload: 'CHANGED' });
                            }}
                        />
                    </div>

                    <div className="input-text">
                        <label className="label label-sm">Label</label>
                        <input
                            disabled={article.locked}
                            onChange={event => {
                                dispatch({ type: 'SET_ARTICLE_DATA', key: 'label', payload: event.target.value });
                                dispatch({ type: 'SET_STATUS', payload: 'CHANGED' });
                            }}
                            type="text"
                            className="w-full  form-control form-control-sm"
                            value={article.label}
                            required
                        />
                        <p className="text-xs text-secondary">
                            Hier kann ein Label angegeben werden, das in der Kartenübersicht angezeigt wird.
                        </p>
                    </div>
                </Panel>

                <Panel title="Schlagworte">
                    <div className="editor-tags input-text">
                        <TagSelector
                            availableTags={site.tags}
                            tagList={article.tags}
                            disabled={article.locked}
                            onChange={tags => {
                                dispatch({ type: 'SET_ARTICLE_DATA', key: 'tags', payload: tags });
                                dispatch({ type: 'SET_STATUS', payload: 'CHANGED' });
                            }}
                        />
                    </div>
                </Panel>

                <Panel title="Bibelstellen">
                    <BibleRef disabled={article.locked} />
                </Panel>

                <Panel title="Extras">
                    <div className="input-text">
                        <label className="label label-sm">Icon</label>
                        <input
                            disabled={article.locked}
                            onChange={event => {
                                dispatch({ type: 'SET_ARTICLE_DATA', key: 'icon', payload: event.target.value });
                                dispatch({ type: 'SET_STATUS', payload: 'CHANGED' });
                            }}
                            type="text"
                            className="w-full form-control form-control-sm"
                            value={article.icon}
                        />
                        <p className="text-xs text-secondary">
                            Ein beliebiges Icon von{' '}
                            <a target="_blank" href="https://fonts.google.com/icons">
                                https://fonts.google.com/icons
                            </a>
                        </p>
                    </div>

                    <div className="input-text mb-4">
                        <label className="label label-sm">Copyright</label>
                        <input
                            disabled={article.locked}
                            onChange={event => {
                                dispatch({ type: 'SET_ARTICLE_DATA', key: 'copyright', payload: event.target.value });
                                dispatch({ type: 'SET_STATUS', payload: 'CHANGED' });
                            }}
                            type="text"
                            className="w-full  form-control form-control-sm"
                            value={article.copyright}
                            required
                        />
                        <p className="text-xs text-secondary">Optionaler Copyright-Vermerk</p>
                    </div>

                    <div className="form-check form-switch mb-4">
                        <input
                            className="form-check-input"
                            disabled={article.locked}
                            type="checkbox"
                            checked={article.exclude}
                            onChange={event => {
                                dispatch({
                                    type: 'SET_ARTICLE_DATA',
                                    key: 'exclude',
                                    payload: !article.exclude,
                                });
                                dispatch({ type: 'SET_STATUS', payload: 'CHANGED' });
                            }}
                        />

                        <label className="form-check-label" htmlFor="flexSwitchCheckChecked">
                            Seite bei der Suche ausschließen
                        </label>
                    </div>

                    <div className="form-check form-switch">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            disabled={window.DOKU_USER.acl < 255}
                            checked={article.locked}
                            onChange={() => {
                                dispatch({
                                    type: 'SET_ARTICLE_DATA',
                                    key: 'locked',
                                    payload: !article.locked,
                                });
                                dispatch({ type: 'SET_STATUS', payload: 'CHANGED' });
                            }}
                        />

                        <label className="form-check-label" htmlFor="flexSwitchCheckChecked">
                            Seite sperren
                        </label>
                    </div>
                </Panel>
            </div>
        </div>
    );
};

export default Inspector;
