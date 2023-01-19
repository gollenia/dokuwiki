import CodeMirror, { BasicSetupOptions, ReactCodeMirrorRef } from '@uiw/react-codemirror';
import { EditorView } from 'codemirror';
import React, { useContext, useRef } from 'react';
import { FormattedDate, FormattedTime } from 'react-intl';
import { store } from '../../services/store';
import ToolBar from './ToolBar';

type Props = {};

const TextEditor = (props: Props) => {
    const globalState = useContext(store);
    const {
        state: { article },
        dispatch,
    } = globalState;

    const editorRef = useRef<ReactCodeMirrorRef>();

    const view = editorRef?.current?.view;
    const setup: BasicSetupOptions = {
        lineNumbers: false,
        foldGutter: false,
        history: true,
    };

    return (
        <>
            <div className="editor">
                <ToolBar view={view} />

                <CodeMirror
                    value={article.content}
                    readOnly={article.locked}
                    extensions={[EditorView.lineWrapping]}
                    ref={editorRef}
                    onChange={text => {
                        dispatch({ type: 'SET_ARTICLE_DATA', key: 'content', payload: text });
                        dispatch({ type: 'SET_STATUS', payload: 'CHANGED' });
                    }}
                    basicSetup={setup}
                />
            </div>
            <div className="editor-info">
                {article.user ? (
                    <>
                        {article.locked && <i className="material-symbols-outlined">lock</i>}
                        Zuletzt bearbeitet von {article.user} am{' '}
                        <FormattedDate value={article.date?.date ?? new Date()} /> um{' '}
                        <FormattedTime value={article.date?.date ?? new Date()} /> Uhr
                    </>
                ) : (
                    <>Neuer Artikel</>
                )}
            </div>
        </>
    );
};

export default TextEditor;
