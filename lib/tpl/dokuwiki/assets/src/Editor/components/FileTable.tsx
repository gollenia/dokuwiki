import React, { useContext } from 'react';
import { store } from '../services/store';
import FileTableRow from './FileTableRow';


const FileTable: React.FC = () => {

	const globalState = useContext(store);
	const { state: {article, files}, dispatch } = globalState;

	return (
		<>
			<table className='table w-100 filetable align-middle'>
				<thead>
				<tr>
					<th scope="col"></th>
					<th scope="col">Name</th>
					<th scope="col">Größe</th>
					<th scope="col">Klicks</th>
					<th scope="col">Aktionen</th>
				</tr>
				</thead>
				<tbody>
				{ files.map((file, index) => {
					return <FileTableRow file={file} key={index} index={index}/>
				})}
				</tbody>
			</table>
			
		</>
	)
}

export default FileTable