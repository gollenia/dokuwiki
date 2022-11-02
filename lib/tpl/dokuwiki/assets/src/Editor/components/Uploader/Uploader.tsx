import React, { useState } from 'react'
import FileDrop from './FileDrop'
import Progress from './Progress'

type Props = {
	height?: number
	target: string
	onFinish: () => void
}

const Uploader = (props: Props) => {

	const { height, target, onFinish } = props

	const [ uploadList, setUploadList ] = useState<FileList>()
	const filesChanged = (files: FileList) => {
		setUploadList(files)
	}

	return (
		<div>
			{ !uploadList && <FileDrop onChange={filesChanged} /> }

			{ uploadList?.length > 0 && <Progress onFinish={onFinish} fileList={uploadList} target={target}/>}
		</div>
	)
}

export default Uploader