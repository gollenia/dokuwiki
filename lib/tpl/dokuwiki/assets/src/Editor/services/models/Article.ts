import { PhpDate } from "./PhpDate";

type Article = {
	id: string;
	tags: Array<string>;
	pageimage: string;
	title: string;
	content: string;
	summary: string;
	exclude: boolean;
	category: string;
	icon: string
	template: string;
	pagelink: string;
	date: PhpDate;
	language: string
	abstract: string;
	showSubpages: boolean;
	namespace: string;
	user: string;
	minor_change: boolean;
}

const emptyArticle = {
	id: '',
	tags: new Array,
	pageimage: '',
	title: '',
	content: '',
	summary: '',
	exclude: true,
	category: '',
	icon: '',
	template: '',
	pagelink: '',
	date: {
		date: '',
		timezone: '',
		timezone_type: 0
	},
	language: '',
	abstract: '',
	showSubpages: false,
	namespace: '',
	user: '',
	minor_change: false
}

export const articleReducer = (state: Article, action: ArticleAction) => {
	switch (action.type) {
		case 'SET_ARTICLE':
			if (typeof action.payload != 'string') return { ...state, error: 'Language must be a string', status: 'error' };
			localStorage.setItem('dp_lang', action.payload ?? '')
			return { ...state, lang: action.payload }
		case 'SET_ARTICLE_DATA':
			return { ...state, status: action.payload }
		default:
			return state;
	};
}

export default Article;
export { emptyArticle };

export type ArticleAction =   {type: 'SET_ARTICLE', payload: Article}
							| {type: 'SET_ARTICLE_DATA', payload: any, key: string} 

