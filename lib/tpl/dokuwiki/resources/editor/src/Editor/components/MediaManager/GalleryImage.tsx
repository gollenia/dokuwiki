import React, { useContext, useRef, useState } from 'react';
import { Attachment } from '../../services/models/Attachment';
import { store } from '../../services/store';

type Props = {
	image: Attachment,
	onSelect: (image: Attachment) => void
	onChange: () => void
}

const GalleryImage = (props: Props) => {

	const globalState = useContext(store);

	const { image, onSelect, onChange } = props

	const [ renameMode, setRenameMode ] = useState<boolean>(false)
	const inputField = useRef<HTMLInputElement>();

	const renameOrCancel = (event: React.KeyboardEvent) => {
		if(event.key == "Escape") {
			inputField.current.value = '';
			setRenameMode(false)
		}
		if(event.key == "Enter") {
			let name = inputField.current.value
			if(name.split('.').pop() != 'jpg') name = name + ".jpg";
			fetch(`/?controller=media&method=rename&id=${image.id}&name=${name}`)
			.then(response => response.json())
			.then(data => {
				if(!data) return;
				onChange()
			})

			setRenameMode(false)
		}
	}


	const deleteFile = () => {
		fetch('/?controller=media&method=delete&id='+image.id)
			.then(response => response.json())
			.then(data => {
				if(!data) return;
				onChange()
			})
	}

	return (
		<div className="g-col-3 image">
			<i className='material-symbols-outlined delete' onClick={() => deleteFile()}>delete</i>
			<img onClick={() => {onSelect(image)}} loading="lazy"  src={image.thumbnail} />
			<div className='name'>
				{ !renameMode && <><span>{image.filename}</span><i className='material-symbols-outlined' onClick={() => {setRenameMode(true)}}>edit</i></> }
				{ renameMode && <input ref={inputField} type="text" autoFocus onKeyDown={(event) => renameOrCancel(event)}/>}
			</div>
		</div>
	)
}

export default GalleryImage