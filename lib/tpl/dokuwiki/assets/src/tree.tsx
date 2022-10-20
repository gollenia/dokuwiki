import React from "react";
import ReactDOM from 'react-dom/client';
import TreeView from './Tree/TreeView';
const root = ReactDOM.createRoot(
	document.getElementById('react-tree') as HTMLElement
);

root.render(
	<React.StrictMode>
		<TreeView />
	</React.StrictMode>
);