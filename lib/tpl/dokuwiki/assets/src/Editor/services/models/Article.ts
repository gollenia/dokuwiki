import { Attachment } from './Attachment';
import { BibleRef } from './Bible';
import { PhpDate } from './PhpDate';

type Article = {
    id: string;
    title: string;
    content: string;
    abstract: string;
    namespace: string;
    label: string;

    user: string;
    date: PhpDate;
    created: PhpDate;
    locked: boolean;

    category: string;
    audience: string;
    tags: Array<string>;
    bibleref: Array<BibleRef>;

    icon: string;
    files: Array<Attachment>;
    pageimage: string;
    headersize: number;
    copyright: string;
    exclude: boolean;
    showSubpages: boolean;
};

const emptyArticle = {
    id: '',
    title: '',
    content: '',
    abstract: '',
    namespace: '',
    label: '',

    user: '',
    date: {
        date: '',
        timezone: '',
        timezone_type: 0,
    },
    created: {
        date: '',
        timezone: '',
        timezone_type: 0,
    },
    locked: false,

    category: '',
    audience: '',
    tags: new Array(),
    bibleref: new Array(),

    icon: '',
    files: new Array(),
    pageimage: '',
    headersize: 21,
    copyright: '',
    exclude: false,
    showSubpages: false,
};

export const articleReducer = (state: Article, action: ArticleAction) => {
    switch (action.type) {
        case 'SET_ARTICLE':
            if (typeof action.payload != 'string')
                return { ...state, error: 'Language must be a string', status: 'error' };
            localStorage.setItem('dp_lang', action.payload ?? '');
            return { ...state, lang: action.payload };
        case 'SET_ARTICLE_DATA':
            return { ...state, status: action.payload };
        default:
            return state;
    }
};

export default Article;
export { emptyArticle };

export type ArticleAction =
    | { type: 'SET_ARTICLE'; payload: Article }
    | { type: 'SET_ARTICLE_DATA'; payload: any; key: string };
