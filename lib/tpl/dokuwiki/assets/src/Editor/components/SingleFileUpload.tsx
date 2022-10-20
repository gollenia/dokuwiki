import React, { useEffect, useState } from 'react';

type Props = {
	file: File
}

const SingleFileUpload = (props: Props) => {

	const [startUpload, setStartUpload] = useState(false);
	const [uploadStarted, setUploadStarted] = useState(false);
	const [percent, setPercent] = useState(0);

	useEffect(() => {
		if(!startUpload || uploadStarted) return;
	}, [startUpload])

	const { file } = props
	return <div className='fileupload'>
	<div className="fileupload-name">{file.name} - </div>
	<span className="">{file.size}</span>
</div>
}

export default SingleFileUpload