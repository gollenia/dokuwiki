import React, { useContext, useState } from 'react';
import { store } from '../../services/store';
import Uploader from '../Uploader/Uploader';
import FileTable from './FileTable';

type Props = {

}

const FileManager = (props: Props) => {

	const globalState = useContext(store);
	const { state: {filemanager, files, article}, dispatch } = globalState;

	const [ uploadMode, setUploadMode ] = useState<boolean>(false)

	const closeModal = () => {
		dispatch({type: 'SHOW_FILEMANAGER', payload: false})
	}



  	return (
		<div>
			<div className={"modal modal-xl fade " + (filemanager ? 'show' : '')} 
				style={{display: filemanager ? 'block' : ''}} 
				id="exampleModal" 
				aria-labelledby="exampleModalLabel" 
				aria-modal={filemanager}
				role="dialog"
			>
				<div className="modal-dialog">
					<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title" id="exampleModalLabel">Dateimanager</h5>
						<button type="button" className="btn-close" aria-label="Close" onClick={() => {closeModal()}}></button>
					</div>
					<div className="">
						<div className="p-4">
							{ !uploadMode && <div className="">
							<FileTable />
							</div> }
							{ uploadMode && 
							<div className="p-4">
							<Uploader onFinish={() => setUploadMode(false)} target={window.DOKU_ID}/>
							</div> }
						</div>
					</div>
					<div className="modal-footer">
						
						<button type="button" className="btn btn-primary" onClick={() => {setUploadMode(true)}}>Upload</button>
					</div>
					</div>
				</div>
			</div>
			{ filemanager && <div className="modal-backdrop fade show"></div> }
		</div>
  	)
}

export default FileManager