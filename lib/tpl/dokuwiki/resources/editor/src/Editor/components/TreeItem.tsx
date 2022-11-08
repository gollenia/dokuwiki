import { useEffect, useState } from 'react';

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
	onClickCallback: (event: any) => void
}

const TreeItem= (props: TreeItemProps) => {

	const {item, currentID, onClickCallback } = props;
	
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
			{!item.children && <span onClick={(event) => {onClickCallback((item.id))}}><i className='material-symbols-outlined'>text_snippet</i> <span>{item.title}</span></span> }

			{item.children && <>
				<span>
					<i onClick={() => toggleOpen()} className='material-icons icon-chevron'>chevron_right</i>
					<i className='material-symbols-outlined'>folder</i>
					<span onClick={(event) => {onClickCallback((item.id))}}>{item.title}</span>
					
				</span>
				<ul> { item.children.map((child, index) => {
				return(
				    <TreeItem key={index} currentID={currentID}  item={child} onClickCallback={onClickCallback} />
				)}
				)} </ul></> }
		</li>
	)
}

export default TreeItem