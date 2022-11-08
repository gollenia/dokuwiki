import React, { useRef, useState } from 'react';

type Props = {
	onChange: (e: FileList) => void
}

const FileDrop = (props: Props) => {

	const { onChange } = props

	const handleChange = function(e: any) {
		e.preventDefault();
		if (e.target.files && e.target.files[0]) {
			onChange(e.target.files)
		}
	};

	const [dragActive, setDragActive] = useState(false);

	let fileInput = useRef<HTMLInputElement>();

	const handleDrag = (event: any) => {
		event.preventDefault();
		event.stopPropagation();
		setDragActive(event.type === "dragenter" || event.type === "dragover");
	}

	const handleDrop = function(e: any) {
		e.preventDefault();
		e.stopPropagation();
		setDragActive(false);
		if (e.dataTransfer.files && e.dataTransfer.files[0]) {
		  	onChange(e.dataTransfer.files)
		}
	};

	const onButtonClick = (event: any) => {
		if(fileInput === undefined) return;
		fileInput?.current?.click();
	}
	
	return (
		<form className="filedropper"  onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
			<input ref={fileInput} type="file" className="filedropper-input" multiple={true} onChange={handleChange}/>
			<label onClick={onButtonClick} htmlFor="input-file-upload" className={"filedropper-label " + (dragActive ? "active" : "" )}>
				<div className='filedropper-help'>
					<i className="material-icons">cloud_upload</i>
					<p>Klicken oder Dateien Drüberziehen</p>
				
				</div> 
			</label>
			{ dragActive && <div className='filedropper-surface' onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div> }
		</form>
	)
}

export default FileDrop