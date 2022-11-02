import CodeMirror, { BasicSetupOptions, ReactCodeMirrorRef } from '@uiw/react-codemirror';
import { EditorView } from "codemirror";
import React, { useContext, useRef } from 'react';
import { store } from '../../services/store';
import ToolBar from './ToolBar';

type Props = {}

const TextEditor = (props: Props) => {

	const globalState = useContext(store);
	const { state: {article}, dispatch } = globalState;

	const editorRef = useRef<ReactCodeMirrorRef>();

	const view = editorRef?.current?.view;
	const setup: BasicSetupOptions = {
		lineNumbers: false,
		foldGutter: false,
		history: true
	}

	
	
	return (
	<div className='editor'>
		<ToolBar view={view}/>
		
		<CodeMirror 
			value={article.content}
			extensions={[EditorView.lineWrapping]}
			ref={editorRef}
			
			onChange={(text) => {dispatch({type: 'SET_ARTICLE_DATA', key: 'content', payload: text})}}
			basicSetup={setup}
		/>
	</div>
	)
}









export default TextEditor