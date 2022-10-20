import React from "react";
import ReactDOM from 'react-dom/client';
import Editor from './Editor/Editor';
import { StateProvider } from './Editor/services/store';
import { IntlProvider } from 'react-intl';

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