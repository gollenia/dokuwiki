import React, { useContext } from 'react';
import { FormattedNumber } from 'react-intl';
import fileSize from '../../services/fileSize';
import { store } from '../../services/store';
import FileIcon from './FileIcon';


const FileList: React.FC = () => {

	const globalState = useContext(store);
	const { state: { files} } = globalState;
	
	return (
		<>
			<div className='w-100 filelist'>
				{ files.map((file, index) => {
					const humanReadableSize = fileSize(file.size)
					return <div key={index} className='text-xs d-flex filelist-row'>
							<FileIcon className="filelist-icon"  extension={file.extension} size={16}/>
							<div className="filelist-name"><a href={'/_media/'+file.id}>{file.filename}</a></div>
							<span className="filelist-size"><FormattedNumber value={humanReadableSize.value} unit={humanReadableSize.unit} style="unit" maximumSignificantDigits={3} /></span>
						</div>
				})}
			</div>
			
		</>
	)
}

export default FileList