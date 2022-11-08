import { PhpDate } from "./PhpDate";

export type Attachment = {
	id: string,
	path: string,
	thumbnail: string,
	src: string,
	full: string,
	filename: string,
	size: number;
	modified: PhpDate;
	exists: boolean;
	count: number;
	extension: string,
	info: string,
	writable: boolean
	minor_change: boolean;
}

export const emptyAttachment: Attachment = {
	id: '',
	path: '',
	thumbnail: '',
	src: '',
	full: '',
	exists: false,
	filename: '',
	size: 0,
	modified: {
		date: '',
		timezone: '',
		timezone_type: 0
	},
	count: 0,
	extension: '',
	info: '',
	writable: false,
	minor_change: false
}

export type AttachmentAction = {type: 'SET_FILES', payload: Array<Attachment>} 
						   | { type: 'ADD_FILES', payload: Array<Attachment>}
						   | { type: 'RENAME_FILE', payload: {index: number, name: string}}
						   | {type:  'DELETE_FILE', payload: number }