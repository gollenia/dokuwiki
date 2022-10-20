import React, { createContext, Dispatch, useReducer } from 'react';
import getCurrentLanguage from './getCurrentLanguage';
import Article, { ArticleAction, emptyArticle } from './models/Article';
import { Attachment, AttachmentAction } from './models/Attachment';
import { BibleRefAction, Verse } from './models/Bible';
import { Site, SiteAction } from './models/Site';


type InitialStateType = {
	site: Site;
	article: Article;
	files: Array<Attachment>;
	bibleRefs: Array<Verse>;
	error: string;
	lang: string;
	status: string;
	mediamanager: boolean;
	filemanager: boolean;
};

const initialState: InitialStateType = {
	site: {
		tags: [],
		categories: [],
		bible: {
			books: [],
			info: {}
		}
	},
	article: emptyArticle,
	files: [],
	bibleRefs: [],
	error: '',
	lang: getCurrentLanguage(),
	status: 'init',
	mediamanager: false,
	filemanager: false
}

type Action = SiteAction | ArticleAction | AttachmentAction | BibleRefAction 
			| { type: 'SET_ERROR' | 'SET_LANG' | 'SET_STATUS', payload: string} 
			| { type: 'SHOW_MEDIAMANAGER' | 'SHOW_FILEMANAGER', payload: boolean }

type ProviderProps = {
	children: React.ReactNode; // 👈️ type children
};

const store = createContext<{
	state: InitialStateType;
	dispatch: Dispatch<Action>
}>({ state: initialState, dispatch: () => null });

const { Provider } = store;

const getState = (state: any) => {
	return state
}

const StateProvider: React.FC<ProviderProps> = (props) => {

	const reducer = (state: InitialStateType, action: Action) => {
		switch (action.type) {
			case 'SET_ARTICLE': 
				return {...state, article: action.payload}
			case 'SET_ARTICLE_DATA':
				return {...state, article: { ...state.article, [action.key]: action.payload}}
			case 'SET_FILES': 
				return {...state, files: action.payload} 
			case 'SET_BIBLEREFS':
				return {...state, bibleRefs: action.payload}
			case 'ADD_BIBLEREF': {
				return {...state, bibleRefs: [...state.bibleRefs, action.payload]}
			}
			case 'DELETE_BIBLEREF':
				return {...state, bibleRefs: state.bibleRefs.splice(action.payload, 1)}
			case 'ADD_FILES': {
				return {...state, files: state.files.concat(action.payload)}
			}
			case 'DELETE_FILE': {
				let tempFiles = [...state.files];
				tempFiles.splice(action.payload, 1)
				return {...state, files: tempFiles}
			}
			case 'RENAME_FILE': {
				let tempFiles = [...state.files];
				tempFiles[action.payload.index].filename = action.payload.name
				return {...state, files: tempFiles}
			}
			case 'SET_LANG':
				if (typeof action.payload != 'string') return { ...state, error: 'Language must be a string', status: 'error' };
				localStorage.setItem('dp_lang', action.payload ?? '')
				return { ...state, lang: action.payload }
			case 'SET_STATUS':
				return { ...state, status: action.payload }
			case 'SET_SITE':
				return { ...state, site: action.payload }
			case 'SET_ERROR':
				return { ...state, error: action.payload }
			case 'SHOW_MEDIAMANAGER':
				return { ...state, mediamanager: action.payload }
			case 'SHOW_FILEMANAGER':
				return { ...state, filemanager: action.payload }
			default:
				return state;
		};
	}

	const [state, dispatch] = useReducer(reducer, initialState);

	return (<Provider value={{ state, dispatch }} >{props.children}</Provider>);
};

export { store, StateProvider, getState };
