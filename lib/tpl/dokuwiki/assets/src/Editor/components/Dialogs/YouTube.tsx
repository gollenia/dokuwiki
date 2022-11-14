import React, { useState } from 'react';

interface Props {
	showYouTube: boolean,
	setShowYouTube: (show: boolean) => void,
	onChange: (videoSyntax: string) => void,
}

export type Video = {
	id: string,
	url: string,
	autoplay: boolean,
	start?: number,
	end?: number,
	rel?: boolean,
	valid: boolean
}

const YouTube = (props: Props) => {

	const { showYouTube, onChange, setShowYouTube } = props;
	const [ videoObject, setVideoObject ] = useState<Video>({
		id: '',
		url: '',
		autoplay: false,
		valid: false
	});

	const [ error, setError ] = useState<string>('')

	const extractUrlInfo = (url: string) => {
		setVideoObject(video => { return {...video, url}})
		if(!url) return;

		if(url.length == 11 && url.match(/^[0-9a-zA-Z]+$/)) {
			setError('');
			setVideoObject(video => { return {
				...video,
				id: url,
				valid: true
			}});
			return;
		}

		const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
		const match = url.match(regExp);

		const resetVideoObject = () => {
			setVideoObject(video => { return {
				...video,
				id: '',
				valid: false
			}});
		}

		if(!match || match.length < 7) {
			setError('Ungültiger YouTube Link');
			resetVideoObject();
			return
		}

		if(match[7].length != 11) {
			setError('Youtube ID ist zu ' + (match[7].length > 11 ? 'lang' : 'kurz') + '. Die ID hat genau 11 Zeichen.');
			resetVideoObject();
			return
		}

		setError('');
		setVideoObject(video => { return {
			...video,
			id: match[7],
			valid: true
		}});
	}

	const createSyntax = () => {
		return '<youtube id="' + videoObject.id + '" autoplay="' + (+videoObject.autoplay) + '">'
	}

	const clickOk = () => {
		onChange(createSyntax())
	}

	return (
		<>
			<div className={"modal modal-md fade " + (showYouTube ? 'show' : '')} 
				style={{display: showYouTube ? 'block' : ''}} 
				id="exampleModal" 
				aria-labelledby="exampleModalLabel" 
				aria-modal={showYouTube}
				role="dialog"
			>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="exampleModalLabel">Video einfügen</h5>
							<button type="button" className="btn-close" aria-label="Close" onClick={() => {setShowYouTube(false)}}></button>
						</div>
						<div className="container">
							<div>
								<input className={'form-control' + (error ? ' is-invalid' : '')} type="text" value={videoObject.url} onChange={(event) => extractUrlInfo(event.target.value)}/>
								{ error && <div className="invalid-feedback">{error}</div> }
							</div>
							<div className='form-check form-switch mt-4'>
								<input 
									className="form-check-input" 
									type="checkbox" role="switch" 
									id="autoplayCheck" 
									checked={videoObject.autoplay} 
									onChange={(event) => {setVideoObject(video => {return {...video, autoplay: !videoObject.autoplay}})}}/>
								<label className="form-check-label" htmlFor="autoplayCheck">Autoplay</label>
							</div>
						</div>
						<div className='modal-footer'>
							<button className='btn btn-secondary' onClick={() => setShowYouTube(false)}>Abbrechen</button>					
							<button disabled={!videoObject.valid} className='btn btn-primary' onClick={() => clickOk()}>OK</button>					
						</div>
					</div>
					
				</div>
				
			</div>
			{ showYouTube && <div className="modal-backdrop fade show"></div> }
		</>
	)
}

export default YouTube