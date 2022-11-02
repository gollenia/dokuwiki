import React, { useEffect, useState } from 'react';
import NewPage from './NewPage';
import TreeItem from './TreeItem';

import './tree.scss';

declare global {
    interface Window { DOKU_ID: string; }
}

const TreeView = () => {

	const currentId = window.DOKU_ID ?? '';

	const [tree, setTree] = useState([])

	useEffect(() => {
		fetch('/?controller=edit&method=tree')
			.then(response => response.json())
			.then(data => setTree(data))
	},[]);
	console.log(tree)

  return (
	<>
		<ul className='tree tree-root'>
		{ tree?.map((item, index) => {
			return <TreeItem key={index} currentID={currentId} item={item} />
		}) }
		</ul>

		<NewPage />
	</>
  )
}

export default TreeView