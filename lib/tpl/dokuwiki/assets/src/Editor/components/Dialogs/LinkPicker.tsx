import React, { useEffect, useState } from 'react';
import TreeItem from './TreeItem';

declare global {
    interface Window { 
		DOKU_ID: string; 
	}
}

export type Link = {
	id: string,
	url: string,
	title: string
}

type Props = {
	onChange: (target: Link) => void
	showPicker: boolean
	setShowPicker: (show: boolean) => void
	title: string
}

const LinkPicker = (props: Props) => {

	const { title, onChange, setShowPicker, showPicker } = props
	
	const [ tree, setTree ] = useState([])
	const [currentLink, setCurrentLink] = useState<Link>({
		id: '',
		url: '',
		title: title
	})

	useEffect(() => {
		setCurrentLink({
			id: '',
			url: '',
			title: title
		})
	}, [title])

	useEffect(() => {
		if(!showPicker) return;
		fetch('/?controller=edit&method=tree')
			.then(response => response.json())
			.then(data => setTree(data))
	}, [showPicker])

	const click = () => {
		onChange(currentLink);
	}

	return (
		<>
			<div className={"modal modal-lg fade " + (showPicker ? 'show' : '')} 
				style={{display: showPicker ? 'block' : ''}} 
				id="exampleModal" 
				aria-labelledby="exampleModalLabel" 
				aria-modal={showPicker}
				role="dialog"
			>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="exampleModalLabel">Link auswählen</h5>
							<button type="button" className="btn-close" aria-label="Close" onClick={() => {setShowPicker(false)}}></button>
						</div>
						<div className="container">
						<ul className='tree tree-root' style={{height: '50vh', overflow: 'auto'}}>
							{ tree?.map((item, index) => {
								return <TreeItem key={index} currentID={currentLink.id} item={item} onClickCallback={(id) => {setCurrentLink((link) => { return { ...link, id: id}})}} />
							}) }
						</ul>
						<div>
							<input className='form-control' type="text" value={currentLink.title} onChange={(event) => setCurrentLink((link) => { return { ...link, title: event.target.value}})}/>
						</div>
						</div>
						<div className='modal-footer'>
							<button className='btn btn-secondary'>Abbrechen</button>					
							<button className='btn btn-primary' onClick={() => click()}>OK</button>					
						</div>
					</div>
					
				</div>
				
			</div>
			{ showPicker && <div className="modal-backdrop fade show"></div> }
		</>
		
	)
}

export default LinkPicker