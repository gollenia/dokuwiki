import React, { useContext } from 'react';
import { store } from '../services/store';
import BibleRef from './BibleRef';
import Combobox from './Elemets/Combobox';
import FileList from './FileManager/FileList';
import Panel from './Panel';
import TagSelector from './TagSelector';



const Inspector = () => {
	const globalState = useContext(store);
	const { state: {article, files, site}, dispatch } = globalState;

	const saveArticle = () => {
		fetch(
			'/?lang=' + window.DOKU_LANG + '&controller=edit&method=save&id=' + window.DOKU_ID, 
			{
				method: 'POST', 
				body: JSON.stringify(article),
				headers: {
					"Content-type": "application/json; charset=UTF-8"
				}
			}
		)
		.then((response) => response.json()).then(data => console.log(data))
	}

	

	
	return (
		<div className='inspector'>
			<div className="d-flex justify-content-end gap-2 py-4 px-4">
							<button className="right btn btn-outline-danger" >Löschen</button>
							<button className="right btn btn-primary" onClick={() => saveArticle()}>Speichern</button>
			</div>
			<div className='inspector-panels'>
			<Panel title="Beitragsbild">
				{ article.pageimage && article.pageimage !== 'error' &&
					<img onClick={() => {dispatch({type: 'SHOW_MEDIAMANAGER', payload: 'inspector'})}} className="object-cover w-100 ratio ratio-16x9" src={'/_media/' + article.pageimage + '?w=600'} /> 
				}
				{ article.pageimage && article.pageimage === 'error' &&
					<div onClick={() => {dispatch({type: 'SHOW_MEDIAMANAGER', payload: 'inspector'})}} className="image-error w-100 ratio ratio-16x9" >
						<div>
						<i className='material-symbols-outlined'>image_not_supported</i>
						<span>Bild nicht gefunden</span>
						</div>
					</div> 
				}
				{ !article.pageimage &&
					<div onClick={() => {dispatch({type: 'SHOW_MEDIAMANAGER', payload: 'inspector'})}} className="image-empty w-100 ratio ratio-16x9" >
						<div>
						<i className='material-symbols-outlined'>photo_library</i>
						<span>Bild aussuchen</span>
						</div>
					</div> 
				}
				<div className="d-flex mt-2 gap-2">
					<button className="btn btn-outline-secondary btn-sm d-flex" onClick={() => {dispatch({type: 'SHOW_MEDIAMANAGER', payload: 'inspector'})}}><i className="material-symbols-outlined">image</i> Ändern</button>
					<button className="btn btn-outline-danger btn-sm d-flex" onClick={() => {}}><i className="material-symbols-outlined">delete</i> Entfernen</button>
				</div>
			</Panel>

			<Panel title="Dateien" open={true}>
				<FileList />
				<div className='d-flex flex-row-reverse mt-4'>
					<button onClick={() => {dispatch({ type: 'SHOW_FILEMANAGER', payload: true })}} className='btn btn-primary btn-sm'>Dateimanager</button>
				</div>
			</Panel>

			<Panel title="Zusammenfassung">
			<div className="input-textarea">
					<textarea onChange={() => {}} className="w-full form-control form-control-sm" rows={5} value={article.abstract}></textarea>
					<p className="text-xs text-secondary">Die Zusammenfassung wird als Vortschau auf den Übersichtsseiten angezeigt. Maximal 100 Buchstaben.</p>
				</div>
			</Panel>
			
			<Panel title="Taxonomie">
                    <div className="input-text mb-4">
                        <label className="label label-sm">Kategorie</label>
                        <Combobox placeholder={site.categories?.find(category => category.value == article.category)?.label} options={site.categories} onChange={(e) => dispatch({type: 'SET_ARTICLE_DATA', key: 'category', payload: e})}/>
                    </div>    
		
                    <div className="input-text">
                        <label className="label label-sm">Zielgruppe</label>
                        <Combobox placeholder={site.audience?.find(audience => audience.value == article.audience)?.label} options={site.audience} onChange={(e) => dispatch({type: 'SET_ARTICLE_DATA', key: 'audience', payload: e})}/>
                    </div>    
			</Panel>

			<Panel title="Schlagworte">
				<div className="editor-tags input-text">
					<TagSelector availableTags={site.tags} savedTags={article.tags} onChange={(tags) => {dispatch({type: 'SET_ARTICLE_DATA', key: 'tags', payload: tags})}}/>
				</div>
			</Panel>

			<Panel title="Bibelstellen">
				<BibleRef />
			</Panel>
			
			<Panel title="Erscheinungsbild">
			        <div className="input-text">
                        <label className="label label-sm">Icon</label>
                        <input onChange={(event) => {dispatch({type: 'SET_ARTICLE_DATA', key: 'icon', payload: event.target.value})}} type="text" className="w-full form-control form-control-sm" value={article.icon} />
                        <p className="text-xs text-secondary">Ein beliebiges Icon von <a href="https://fonts.google.com/icons">https://fonts.google.com/icons</a> aus dem "Filled"-Set. Bitte den Namen Kleingeschrieben und mit Unterstrichen angeben</p>
                    </div>
					<div className="input-text">
                    <label className="label label-sm">Seitenlink</label>
                    <input onChange={(event) => {dispatch({type: 'SET_ARTICLE_DATA', key: 'pagelink', payload: event.target.value})}} type="text"  className="w-full  form-control form-control-sm" value={article.pagelink} required />
                    <p className="text-xs text-secondary">Hier kann ein Link eingefügt werden, der dann als Button im Titelbild angezeigt wird.</p>
                </div>
			</Panel>



         
			</div>
		</div>
	)
}

export default Inspector