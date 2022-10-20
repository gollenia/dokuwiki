import React, { useContext, useRef, useState } from 'react';
import { store } from '../services/store';
import UploadService from '../services/uploadService';
import FileIcon from './FileIcon';

type Props = {
	fileList: FileList,
	onlyImages?: boolean
}

const Uploader = (props: Props) => {

	const globalState = useContext(store);
	const { state: {files}, dispatch } = globalState;
	const { fileList } = props

	const [progressInfos, setProgressInfos] = useState({ val: [] });
	const [message, setMessage] = useState([]);
	const progressInfosRef = useRef(null)

	const upload = (idx: number, file: File) => {
		let _progressInfos = [...progressInfosRef.current.val];
		return UploadService.upload(file, (event: any) => {
		  _progressInfos[idx].percentage = Math.round(
			(100 * event.loaded) / event.total
		  );
		  setProgressInfos({ val: _progressInfos });
		})
		  .then((i) => {
			console.log(i)
			setMessage((prevMessage) => ([
			  ...prevMessage,
			  "Uploaded the file successfully: " + file.name,
			  
			]));
		  })
		  .catch(() => {
			_progressInfos[idx].percentage = 0;
			setProgressInfos({ val: _progressInfos });
	
			setMessage((prevMessage) => ([
			  ...prevMessage,
			  "Could not upload the file: " + file.name,
			]));
		  });
	};

	const uploadFiles = () => {
		const readyFileList = Array.from(fileList);

		let _progressInfos = readyFileList.map(file => ({ percentage: 0, fileName: file.name, size: file.size }));
	
		progressInfosRef.current = {
		  	val: _progressInfos,
		}
	
		const uploadPromises = readyFileList.map((file, i) => upload(i, file));
	
		Promise.all(uploadPromises)
		  .then(() => {
			 fetch('/?controller=media&method=list&ns='+window.DOKU_ID).then(response => response.json()).then((data) => {
				dispatch({type: 'SET_FILES', payload: data})
			 })
		  })
		  .then((fileList) => {
				
		});
	
		setMessage([]);
	}
	
	return (
		<div>{progressInfos && progressInfos.val.length > 0 &&
			progressInfos.val.map((progressInfo, index) => {
				const processing = progressInfo.percentage != 0 && progressInfo.percentage != 100;
				const finished = progressInfo.percentage === 100;
				const notstarted = progressInfo.percentage === 0;
				const classes = [
					'fileupload',
					processing ? 'uploading' : false,
					processing ? 'notstarted' : false,
					finished ? 'finished' : false
				].filter(Boolean).join(' ')

				const getUploadedSize = () => {
					return Math.floor(progressInfo.size / 100 * progressInfo.percentage)
				}

				const extension = progressInfo.fileName.split('.').pop();
				
				return (
				<div className={classes} key={index}>
					<div className="d-flex gap-3">
						<div>
							<FileIcon extension={extension} size={32} />
						</div>
						<div className="flex-1">
							<div className="d-flex justify-content-between">
								<b>{progressInfo.fileName}</b>
								<span>{progressInfo.percentage}% / {progressInfo.size}</span>
							</div>
							<div className="progress">
								<div
									className='progress-bar'
									role="progressbar"
									style={{ width: progressInfo.percentage + "%" }}
								>
								</div>
							</div>
						</div>
						<i className='material-icons'>
						{ finished && <>check_circle</>}
						{ notstarted && <>pending</>}
						{ processing && <>sync</>}
						</i>
					</div>
				</div>
			)})}
		
		<button onClick={uploadFiles}>Upload Files</button>
		</div>

	)
}

export default Uploader