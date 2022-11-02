import { EditorView } from 'codemirror'
import React, { useState } from 'react'
import LinkPicker, { Link } from '../LinkPicker'

type Props = {
	view: EditorView
}


const ToolBar = (props: Props) => {
	const { view } = props

	const [ picker, setPicker ] = useState<boolean>(false)
	const [selection, setSelection] = useState<string>('')

	const wrapSelection = (wrapper: string, wrapperEnd: string | false = false) => {
		if(!wrapperEnd) wrapperEnd = wrapper
		view.dispatch({ 
			changes: [{ from: view.state.selection.main.from, insert: wrapper},{ from: view.state.selection.main.to, insert: wrapperEnd}],
			selection: { anchor: view.state.selection.main.to + wrapper.length },
			userEvent: "input.type"
		})
	}

	const insertAtSelection = (text: string) => {
		view.dispatch({ 
			changes: [{ from: view.state.selection.main.from, insert: text}],
			selection: { anchor: view.state.selection.main.to + text.length },
			userEvent: "input.type"
		})
	}

	const getSelection = () => {
		const t = view.state.sliceDoc(view.state.selection.main.from, view.state.selection.main.to)
		console.log(t)
		return view.state.sliceDoc(view.state.selection.main.from, view.state.selection.main.to)
	}
	
	const prependLine = (prepend: string) => {
		let lineStart = view.state.doc.lineAt(view.state.selection.main.from)
		let lineEnd = view.state.doc.lineAt(view.state.selection.main.to)
		console.log(lineStart.number, lineEnd.number)
		for(let i = lineStart.number; i < lineEnd.number +1; i++) {
			let line = view.state.doc.line(i);
			console.log(line)
			if(line.text.slice(0, 4) == prepend) continue;
			view.dispatch({ 
				changes: [{ from: line.from, insert: prepend}],
				selection: { anchor: line.text == prepend ? line.to : line.to + prepend.length},
				userEvent: "input.type"
			})
		}
	}

	const appendLine = (append: string) => {
		let line = view.state.doc.lineAt(view.state.selection.main.to)
		view.dispatch({ 
			changes: [{ from: line.to, insert: append}],
			selection: { anchor: line.text == append ? line.to : line.to + append.length},
			userEvent: "input.type"
		})
	}

	return (
		<>
		<div className="editor-toolbar">
			<button onClick={() => {wrapSelection('**')}}><i className='material-symbols-outlined'>format_bold</i><span>Fett</span></button>
			<button onClick={() => {wrapSelection('//')}}><i className='material-symbols-outlined'>format_italic</i><span>Kursiv</span></button>
			<button onClick={() => {wrapSelection('__')}}><i className='material-symbols-outlined'>format_underlined</i><span>Unterstrichen</span></button>
			<button className='hasDrop'><i className='material-symbols-outlined'>format_h1</i><span>Überschrift</span>
			<ul>
				<li onClick={() => {wrapSelection('===== ', ' =====')}}><i className='material-symbols-outlined'>format_h1</i> Ebene 1</li>
				<li onClick={() => {wrapSelection('==== ', ' ====')}}><i className='material-symbols-outlined'>format_h2</i> Ebene 2</li>
				<li onClick={() => {wrapSelection('=== ', ' ===')}}><i className='material-symbols-outlined'>format_h3</i> Ebene 3</li>
				<li onClick={() => {wrapSelection('== ', ' ==')}}><i className='material-symbols-outlined'>format_h4</i> Ebene 4</li>
			</ul>
			</button>
			<button><i onClick={() => { setSelection(getSelection()); setPicker(true) }} className='material-symbols-outlined'>link</i><span>Interner Link</span></button>
			<button><i className='material-symbols-outlined'>public</i><span>Externer Link</span></button>
			<button onClick={() => {prependLine('  - ')}}><i className='material-symbols-outlined'>format_list_bulleted</i><span>Liste</span></button>
			<button onClick={() => {prependLine('  * ')}}><i className='material-symbols-outlined'>format_list_numbered</i><span>Nummerierte Liste</span></button>
			<button onClick={() => {appendLine('\n----\n')}}><i className='material-symbols-outlined'>horizontal_rule</i><span>Trennlinie</span></button>
			<button><i className='material-symbols-outlined'>image</i><span>Bild einfügen</span></button>
			<button><i className='material-symbols-outlined'>auto_stories</i><span>Bibelstelle</span></button>
			<button><i className='material-symbols-outlined'>article</i><span>Box</span></button>
			<button><i className='material-symbols-outlined'>youtube_activity</i><span>Youtube</span></button>
		</div>
		<LinkPicker title={selection} onChange={(link: Link) => {insertAtSelection('[[' + link.id + '|' + link.title + ']]')}} setShowPicker={setPicker} showPicker={picker}/>
		
		</>
	)
}

export default ToolBar