import React, { useContext, useState } from 'react';
import { store } from '../services/store';
import DragDrop from './DragDrop';
import FileTable from './FileTable';
import Uploader from './Uploader';

type Props = {

}

const FileManager = (props: Props) => {

	const globalState = useContext(store);
	const { state: {filemanager, files, article}, dispatch } = globalState;

	const [ uploadList, setUploadList ] = useState<FileList>()

	const closeModal = () => {
		dispatch({type: 'SHOW_FILEMANAGER', payload: false})
	}

	const filesChanged = (files: FileList) => {
		setUploadList(files)
	}

	const hasUploads = uploadList != undefined

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
					<div className="container">
						<div className="row ">
							<div className="col-7 p-4 bg-gray-200">
							<FileTable />
							</div>
							<div className="col-5 p-4">
							<DragDrop onChange={filesChanged} />
							{ hasUploads && <Uploader fileList={uploadList} />}
							</div>
						</div>
					</div>
	
					</div>
				</div>
			</div>
			{ filemanager && <div className="modal-backdrop fade show"></div> }
		</div>
  	)
}

export default FileManager