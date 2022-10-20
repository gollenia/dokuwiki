import React, { useEffect, useState } from 'react';

import fileIcon from './img/file.svg';
import folderIcon from './img/folder.svg';

type TreeItemType = {
	children: Array<TreeItemType> | undefined
	name: string
	title: string
	id: string
	folder: Boolean
}

interface TreeItemProps  {
	item: TreeItemType
	currentID: string
}

const TreeItem= (props: TreeItemProps) => {

	const {item, currentID } = props;
	
	const [open, setOpen] = useState(false);

	const toggleOpen = () => {
		console.log("setting")
		setOpen(!open);
	}

	useEffect(() => {
		if(currentID.includes(item.id)) setOpen(true)
	}, [])

	const classes = [
		open ? 'open' : false,
		item.children ? 'folder' : 'file',
		item.id == currentID ? 'active' : false

	].filter(Boolean).join(' ')

	return (
		<li className={classes}  >
			{!item.children && <span><img src={fileIcon} width="16px" height="16px"/> <a href={'/'+item.id}>{item.title}</a></span> }

			{item.children && <>
				<span>
					<i onClick={() => toggleOpen()} className='material-icons icon-chevron'>chevron_right</i>
					<img src={folderIcon} width="16px" height="16px"/>
					<a href={'/'+item.id}>{item.title}</a>
					
				</span>
				<ul> { item.children.map((child, index) => {
				return(
				    <TreeItem key={index} currentID={currentID}  item={child} />
				)}
				)} </ul></> }
		</li>
	)
}

export default TreeItem