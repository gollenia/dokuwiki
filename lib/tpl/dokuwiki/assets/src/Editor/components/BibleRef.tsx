import React, { useContext, useState } from 'react';
import { BibleRef } from '../services/models/Bible';
import { store } from '../services/store';
import Combobox from './Elemets/Combobox';

type Props = {}

const BibleRef = (props: Props) => {
	const globalState = useContext(store);
	const { state: {article, files, site}, dispatch } = globalState;

	const bookOptions = site.bible.books.map((book) => { return { label: book.long_name, value: book.id } })

	const removeBibleRef = (index: number) => {
		fetch('/api/'+window.DOKU_LANG+'/biblepages/'+article.bibleref[index].id,{
			method: 'DELETE'
		}).then(response => response.json()).then(data => {
			if(data) {
				const refs = article.bibleref;
				refs.splice(index, 1)
				dispatch({type: "SET_ARTICLE_DATA", payload: refs, key: 'bibleref'})
			}
		})
	}

	const getMaxChapters = () => {
		if(!selectedBookId) return 0
		const book = site.bible.books.find((i) => {return i.id == selectedBookId})

		return book.chapters
	}

	const [ selectedBookId, setSelectedBookId ] = useState<any>(0)
	const [ selectedChapter, setSelectedChapter] = useState<any>(0)

	const addBibleRef = (ref: BibleRef) => {
		fetch('lib/exe/ajax.php?call=biblepages&book_id=' + selectedBookId + '&id=' + window.DOKU_ID + '&chapter=' + selectedChapter, {
			method: 'POST'
		}).then(response => response.json()).then(data => {
			if(data) {
				const refs = article.bibleref;
				refs.push({
					id: data,
					book_id: selectedBookId,
					chapter: selectedChapter,
				})
				dispatch({type: "SET_ARTICLE_DATA", payload: refs, key: 'bibleref'})
			}
		}).catch(error => console.log(error))
	}

	return (
		<div className="editor-tags input-text">
				<div className='tagList tags mb-4 mt-2'>
					{ article.bibleref?.map((ref, index) => {
						console.log(site)
						const book = site.bible.books.find(book => book.id == ref.book_id)
						return (<span key={index} className='badge tag bg-primary'>{book.long_name} {ref.chapter} <i className="material-symbols-outlined" onClick={() => {removeBibleRef(index)}}>cancel</i></span>)
					}) }
				</div>
				<div className='d-flex gap-1'>
					<Combobox placeholder="Buch wählen" onChange={(item) => {setSelectedBookId(item)}} options={bookOptions} /> 
					<input max={getMaxChapters()} value={selectedChapter} onChange={event => setSelectedChapter(parseInt(event.target.value))} type="number" className="form-control" style={{width: '5rem'}}/> 
					<button className="btn btn-primary" onClick={() => addBibleRef({
						book_id: 10,
						chapter: 1,
						id: ''
					})}><i className='material-symbols-outlined' style={{fontSize: '20px'}}>add</i></button>
				</div>
				
		</div>
	)
}

export default BibleRef