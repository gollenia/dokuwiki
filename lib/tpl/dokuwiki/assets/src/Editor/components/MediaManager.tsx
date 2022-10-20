import React, { useContext } from 'react';
import { store } from '../services/store';
import FileTable from './FileTable';

type Props = {

}

const MediaManager = (props: Props) => {

	const globalState = useContext(store);
	const { state: {mediamanager, files, article}, dispatch } = globalState;

	const closeModal = () => {

	}

  	return (
		<div>
			<div className={"modal fade " + (mediamanager ? 'show' : '')} 
				style={{display: mediamanager ? 'block' : ''}} 
				id="exampleModal" 
				aria-labelledby="exampleModalLabel" 
				aria-modal={mediamanager}
				role="dialog"
			>
				<div className="modal-dialog">
					<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title" id="exampleModalLabel">Medien</h5>
						<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div className="modal-body">
						<FileTable />
					</div>
					<div className="modal-footer">
						<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Abbrechen</button>
						<button type="button" className="btn btn-primary">Ok</button>
					</div>
					</div>
				</div>
			</div>
			{ mediamanager && <div className="modal-backdrop fade show"></div> }
		</div>
  	)
}

export default MediaManager