import React, { useContext, useEffect, useState } from 'react'
import { Verse } from '../../services/models/Bible'
import { store } from '../../services/store'
import Combobox from '../Elemets/Combobox'

interface Props {
	onChange: (target: string) => void
	showBibleVerse: boolean
	setShowBibleVerse: (show: boolean) => void
	title: string
}

type BibleVerseObject = Verse & {
	title: string
}


const BibleVerse = (props: Props) => {

	const { showBibleVerse, setShowBibleVerse, title, onChange } = props;

	const globalState = useContext(store);

	const { state: {article, files, site, lang}, dispatch } = globalState;

	const bookOptions = site.bible.books.map((book) => { return { label: book.long_name, value: book.id } })

	const [ bibleObject, setBibleObject ] = useState<BibleVerseObject>({
		book: 0,
		chapter: 1,
		verse: 1,
		text: '',
		linebreak: 0,
		title: ''
	});

	const [ maxVerses, setMaxVerses ] = useState(0);

	const getMaxChapters = () => {
		if(!bibleObject.book) return 0
		const book = site.bible.books.find((i) => {return i.id == bibleObject.book})
		return book?.chapters
	}

	useEffect(() => {
		getVerseCount()
	}, [bibleObject])

	const getVerseCount = () => {
		if(!bibleObject.book || bibleObject.chapter == 0) return 0;
		fetch('/lib/exe/ajax.php?call=versecount&book=' + bibleObject.book + '&chapter=' + bibleObject.chapter + '&lang=' + lang)
			.then(response => response.json())
			.then(data => setMaxVerses(data))
	}

	const clickOk = () => {

	}

	return (
		<>
			<div className={"modal modal-lg fade " + (showBibleVerse ? 'show' : '')} 
				style={{display: showBibleVerse ? 'block' : ''}} 
				id="exampleModal" 
				aria-labelledby="exampleModalLabel" 
				aria-modal={showBibleVerse}
				role="dialog"
			>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="exampleModalLabel">Bibelstelle</h5>
							<button type="button" className="btn-close" aria-label="Close" onClick={() => {setShowBibleVerse(false)}}></button>
						</div>
						<div className="container">
						
						<div>
							<input className='form-control' type="text" value={title} onChange={(event) => setBibleObject((bible) => { return {...bible, title: event.target.value}})}/>
							<div className='d-flex'>
								<Combobox placeholder="Buch wählen" onChange={(item) => {setBibleObject(bible => {return { ...bible, book: +item}})}} options={bookOptions} /> 
								<input max={getMaxChapters()} value={bibleObject.chapter} onChange={event => setBibleObject((bible) => { return { ...bible, chapter: parseInt(event.target.value)}})} type="number" className="form-control" style={{width: '5rem'}}/> 
							</div>
							{ maxVerses && Array.from(Array(maxVerses).keys()).map((index) => {
								return <>
									<span className={'badge bg-white'} key={index}>{index}</span>
								</>
							}) }
						</div>

						</div>
						<div className='modal-footer'>
							<button className='btn btn-secondary'>Abbrechen</button>					
							<button className='btn btn-primary' onClick={() => clickOk()}>OK</button>					
						</div>
					</div>
					
				</div>
				
			</div>
			{ showBibleVerse && <div className="modal-backdrop fade show"></div> }
		</>
	)
}

export default BibleVerse