import { Bible } from "./Bible"

export type Site = {
	tags: Array<Tag>
	categories: Array<Category>
	bible: Bible,
	audience: Array<Category>
}

export type Tag = { 
	id: string,
	name: string
}

export type Category = { 
	label: string,
	value: string,
	icon: string,
	color: string	
}


export type SiteAction = { type: 'SET_SITE', payload: Site }
