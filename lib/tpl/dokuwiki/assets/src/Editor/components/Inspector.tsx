import React, { useContext } from 'react';
import { store } from '../services/store';
import Combobox from './Combobox';
import FileList from './FileList';
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
			<div className="d-flex justify-content-end gap-2">
							<button className="right btn btn-secondary" >Vorschau</button>
							<button className="right btn btn-primary" onClick={() => saveArticle()}>Speichern</button>
			</div>
			<div className='inspector-panels'>
			<Panel title="Beitragsbild">
				{ article.pageimage && article.pageimage !== 'error' &&
					<img className="object-cover w-100 ratio ratio-16x9" src={'/_media/' + article.pageimage + '?w=600'} /> 
				}
				{ article.pageimage && article.pageimage === 'error' &&
					<div className="image-error w-100 ratio ratio-16x9 bg-red" >
						<div>
						<i className='material-icons'>image_not_supported</i>
						<span>Bild nicht gefunden</span>
						</div>
					</div> 
				}
				<div className="d-flex mt-2 gap-2">
					<button className="btn btn-outline-secondary btn-sm d-flex" onClick={() => {}}><i className="material-icons">image</i> Ändern</button>
					<button className="btn btn-outline-danger btn-sm d-flex" onClick={() => {}}><i className="material-icons">delete</i> Löschen</button>
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
			
			<Panel title="Kategorie">
                    <div className="input-text">
                        <label className="label label-sm">Kategorie</label>
                        <Combobox options={site.categories} />
                    </div>    
			</Panel>

			<Panel title="Schlagworte">
				<div className="editor-tags input-text">
					<TagSelector availableTags={site.tags} savedTags={article.tags} onChange={(tags) => {dispatch({type: 'SET_ARTICLE_DATA', key: 'tags', payload: tags})}}/>
				</div>
			</Panel>
			
			<Panel title="Erscheinungsbild">
			        <div className="input-text">
                        <label className="label label-sm">Icon</label>
                        <input onChange={() => {}} type="text" className="w-full form-control form-control-sm" value={article.icon} />
                        <p className="text-xs text-secondary">Ein beliebiges Icon von <a href="https://fonts.google.com/icons">https://fonts.google.com/icons</a> aus dem "Filled"-Set. Bitte den Namen Kleingeschrieben und mit Unterstrichen angeben</p>
                    </div>
			</Panel>


			<div className="">
                
                <div className="input-text">
                    <label className="label label-sm">Bilder ausschließen</label>
                    <input onChange={() => {}} type="checkbox" className="checkbox-control form-control-sm" checked={article.exclude} />
                </div>
                <p className="text-xs">Alle Bilder (Jpg-Dateien) werden von der Download-Liste ausgeschlossen</p>
            </div>

            <div className="">
                
                <div className="input-text">
                    <label className="label label-sm">Seitenlink</label>
                    <input onChange={() => {}} type="text"  className="w-full  form-control form-control-sm" v-model="page.pagelink" required />
                    <p className="text-xs text-secondary">Hier kann ein Link eingefügt werden, der dann als Button im Titelbild angezeigt wird.</p>
                </div>
            </div>
			</div>
		</div>
	)
}

export default Inspector