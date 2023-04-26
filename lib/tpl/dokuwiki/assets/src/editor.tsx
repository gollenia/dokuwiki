import React from 'react';
import ReactDOM from 'react-dom/client';
import Menu from './Common/Menu';
import Editor from './Editor/Editor';
import { StateProvider } from './Editor/services/store';
import TreeView from './Tree/TreeView';

const root = ReactDOM.createRoot(document.getElementById('react-editor') as HTMLElement);

root.render(
    <React.StrictMode>
        <StateProvider>
            <TreeView />
            <main className="wrapper flex-grow-1">
                <Menu />
                <article>
                    <div className="edit">
                        <Editor />
                    </div>
                </article>
            </main>
        </StateProvider>
    </React.StrictMode>
);
