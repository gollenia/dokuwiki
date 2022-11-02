import React from 'react';
import docIcon from '../../images/doc.svg';
import fileIcon from '../../images/file.svg';
import jpgIcon from '../../images/jpg.svg';
import mpgIcon from '../../images/mp3.svg';
import pdfIcon from '../../images/pdf.svg';
import pptIcon from '../../images/ppt.svg';
import xlsIcon from '../../images/xls.svg';
import zipIcon from '../../images/zip.svg';

interface Props {
	extension: string;
	size?: number;
	className?: string;
}

const FileIcon = (props: Props) => {

	const { extension, size = 16, className = '' } = props;

	const getIcon = () => {
		
		switch(extension) {
			case 'doc':
			case 'docx':
				return docIcon;
			case 'jpg':
			case 'jpeg':
				return jpgIcon;
			case 'mp3':
			case 'mp4':
				return mpgIcon;
			case 'pdf':
				return pdfIcon;
			case 'ppt':
			case 'pptx':
				return pptIcon;
			case 'xls':
				return xlsIcon;
			case 'zip':
			case '7z':
			case 'rar':
				return zipIcon;
			default:
				return fileIcon
		}
	}

	
	return (
		<img className={className} width={`${size}px`} height={`${size}px`} src={getIcon()} />
	)
}

FileIcon.defaultProps = {
	size: 16,
	className: ''
}

export default FileIcon