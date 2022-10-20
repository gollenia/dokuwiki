declare global {
	interface Window { DOKU_LANG: any; }
}

const getCurrentLanguage = () => {
	return window.DOKU_LANG;
}

export default getCurrentLanguage