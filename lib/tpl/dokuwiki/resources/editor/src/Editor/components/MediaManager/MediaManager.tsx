import { useContext, useEffect, useState } from 'react';
import { Attachment } from '../../services/models/Attachment';
import { store } from '../../services/store';
import Uploader from '../Uploader/Uploader';
import GalleryImage from './GalleryImage';
type Props = {

}

const MediaManager = (props: Props) => {

	const globalState = useContext(store);
	const { state: {mediamanager, files, article}, dispatch } = globalState;

	const [images, setImages] = useState<Array<Attachment>>([]);
	const [search, setSearch] = useState<string>('');
	const [uploadMode, setUploadMode] = useState<boolean>(false)
	const [sort, setSort] = useState<string>('date')

	useEffect(() => {
		if(mediamanager == '') return;
		console.log("reloading")
		loadMedia()
	}, [mediamanager])

	const loadMedia = async (sortMode = '') => {
		if(sortMode == '') sortMode = sort
		fetch('/?controller=media&method=list&ns=system:images&sort='+sortMode)
		.then(response => response.json())
		.then((data) => {
			setImages(data)
			console.log('aktualisiert')
		})
	}

	const closeModal = () => {
		dispatch({type: 'SHOW_MEDIAMANAGER', payload: ''})
	}

	const useImage = (image: Attachment) => {
		if(mediamanager == 'inspector') {
			dispatch({type: 'SET_ARTICLE_DATA', key: 'pageimage', payload: image.id})
			dispatch({type: 'SHOW_MEDIAMANAGER', payload: ''})
		}
	}

	const filteredImages = () => {
		if(search.length < 3) return images
		return images.filter(image => image.filename.includes(search))
	}

	const resort = (mode: string) => {
		setSort(mode)
		loadMedia(mode)
	}

	

	console.log(images)

  	return (
		<div>
			<div className={"modal modal-xl fade " + (mediamanager ? 'show' : '')} 
				style={{display: mediamanager ? 'block' : ''}} 
				id="exampleModal" 
				aria-labelledby="exampleModalLabel" 
				role="dialog"
			>
				<div className="modal-dialog">
					<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title" id="exampleModalLabel">Medien</h5>
						<button type="button" className="btn-close" data-bs-dismiss="modal" onClick={() => closeModal()} aria-label="Close"></button>
					</div>
					{ !uploadMode &&
					<div className="modal-body mediamanager">
						<div className="container">
						<div className="p-4 d-flex gap-2 align-items-center filter">
							<i className='material-symbols-outlined'>tune</i>
							<input placeholder="Suchen..." className="form-control mr-4" value={search} onChange={event => setSearch(event.target.value)} />
							Sortieren: 
								<button className={'btn ' + (sort == 'date' ? 'btn-secondary' : 'btn-outline-secondary')} onClick={() => resort('date')}>Datum</button>
								<button className={'btn ' + (sort == 'normal' ? 'btn-secondary' : 'btn-outline-secondary')} onClick={() => resort('normal')}>Name</button>
							
						</div>
						</div>
						<div className="container grid gallery">
						{ filteredImages().map((image, key) => { return(
							<GalleryImage onChange={() => loadMedia()} image={image} key={key} onSelect={() => useImage(image)}/>
						) })}
						</div>
						
					</div> }
					{ uploadMode && <div className='p-4'>
						<Uploader target='system:images' onFinish={() => {setUploadMode(false); loadMedia()}}/>
					</div> }
					<div className="modal-footer">
						<button type="button" className="btn btn-warning" onClick={() => closeModal()} data-bs-dismiss="modal">Abbrechen</button>
						<button className="btn btn-primary" onClick={() => {setUploadMode(true)}}>Upload</button>
					</div> 
					</div> 
				</div>
			</div>
			{ mediamanager && <div className="modal-backdrop fade show"></div> }
		</div>
  	)
}

export default MediaManager