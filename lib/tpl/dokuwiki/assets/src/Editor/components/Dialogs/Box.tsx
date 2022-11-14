import React, { useState } from 'react';

interface Props {
	showBox: boolean,
	setShowBox: (show: boolean) => void,
	onChange: (boxSyntax: string) => void,
}

export type Box = {
	type: 'info' | 'error' | 'warning' | 'success' | 'neutral',
	title?: string,
	inline: false
}

const Box = (props: Props) => {

	const { showBox, onChange, setShowBox } = props;
	const [ boxObject, setBoxObject ] = useState<Box>({
		type: 'neutral',
		title: '',
		inline: false
	});

	const [ error, setError ] = useState<string>('')

	

	const createSyntax = () => {
		return `<box title="${boxObject.title}" inline="${boxObject.inline ? 1 : 0}" type="${boxObject.type}">`
	}

	const clickOk = () => {
		onChange(createSyntax())
	}

	return (
		<>
			<div className={"modal modal-md fade " + (showBox ? 'show' : '')} 
				style={{display: showBox ? 'block' : ''}} 
				id="exampleModal" 
				aria-labelledby="exampleModalLabel" 
				aria-modal={showBox}
				role="dialog"
			>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="exampleModalLabel">Box einfügen</h5>
							<button type="button" className="btn-close" aria-label="Close" onClick={() => {setShowBox(false)}}></button>
						</div>
						<div className="container">
							<div>
								<input className={'form-control' + (error ? ' is-invalid' : '')} type="text" value={boxObject.title} onChange={(event) => setBoxObject(box => { return { ...box, title: event.target.value}})}/>
								{ error && <div className="invalid-feedback">{error}</div> }
							</div>

							<div>
								<select className={'form-control' + (error ? ' is-invalid' : '')} value={boxObject.title} onChange={(event) => setBoxObject(box => { return { ...box, title: event.target.value}})}>
									<option>Neutral</option>
									<option>Information</option>
									<option>Warnung</option>
									<option>Fehler</option>
									<option>Erfolg</option>

								</select>
								{ error && <div className="invalid-feedback">{error}</div> }
							</div>
							
						</div>
						<div className='modal-footer'>
							<button className='btn btn-secondary' onClick={() => setShowBox(false)}>Abbrechen</button>					
							<button className='btn btn-primary' onClick={() => clickOk()}>OK</button>					
						</div>
					</div>
					
				</div>
				
			</div>
			{ showBox && <div className="modal-backdrop fade show"></div> }
		</>
	)
}

export default Box