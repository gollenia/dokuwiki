import CodeMirror from '@uiw/react-codemirror';
import { EditorView } from "codemirror";
import React, { useContext, useEffect } from 'react';
import { IntlProvider } from 'react-intl';
import FileManager from './components/FileManager';
import Inspector from './components/Inspector';
import MediaManager from './components/MediaManager';
import { Site } from './services/models/Site';
import { store } from './services/store';
import useTranslation from './services/useTranslation';
	

declare global {
    interface Window { 
		DOKU_ID: string; 
		DOKU_SITE: Site
	}
}

const Editor = () => {

	const currentLanguage = window.DOKU_LANG;

	const globalState = useContext(store);
	const { state: {article}, dispatch } = globalState;

	const messages = useTranslation(currentLanguage)

	useEffect(() => {
		dispatch({type: 'SET_SITE', payload: window.DOKU_SITE});
		fetch('/?controller=page&lang=' + window.DOKU_LANG + '&id='+window.DOKU_ID).then(response => response.json())
		.then(data => {
			dispatch({type: 'SET_ARTICLE', payload: data});
			dispatch({type: 'SET_FILES', payload: data.files});
		})
		fetch('/?controller=media&method=sectok').then(response => response.json()).then(data => {
			window.localStorage.setItem('sectok', data)
		})
	}, [])

	return (
		<IntlProvider locale={currentLanguage} defaultLocale="en" messages={messages}>
		<div className="d-flex">
			<div className="edit-wrapper p-4">
			<div className="input-text">
				<label className="label">Titel</label>
				<input className="w-100 form-control form-control-lg" value={article.title} onChange={(event) => dispatch({type: 'SET_ARTICLE_DATA', payload: event.target.value, key: 'title'})}/>
			</div>
			<div className="editor">
			<CodeMirror 
				value={article.content}
				extensions={[EditorView.lineWrapping]}
			/>
			<MediaManager />
			<FileManager />
			</div>
			</div>
			<Inspector />
		</div>
		</IntlProvider>
	)
}

export default Editor