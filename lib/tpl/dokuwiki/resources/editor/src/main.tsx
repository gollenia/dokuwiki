import React from "react";
import ReactDOM from 'react-dom/client';
import Editor from './Editor/Editor';
import { StateProvider } from './Editor/services/store';

const root = ReactDOM.createRoot(
	document.getElementById('react-editor') as HTMLElement
);



root.render(
	<React.StrictMode>
		<StateProvider>
			<Editor />
		</StateProvider>
	</React.StrictMode>
);