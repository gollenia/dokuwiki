import React, { useEffect, useState } from 'react';
import NewPage from './NewPage';
import TreeItem from './TreeItem';

import './tree.scss';

declare global {
    interface Window {
        DOKU_ID: string;
    }
}

const TreeView = () => {
    const currentId = window.DOKU_ID ?? '';

    const [tree, setTree] = useState([]);
    const [currentDrag, setCurrentDrag] = useState('');

    useEffect(() => {
        fetch('/?controller=edit&method=tree&current_id=' + currentId)
            .then(response => response.json())
            .then(data => setTree(data));
    }, []);

    const triggerReload = () => {
        fetch('/?controller=edit&method=tree&current_id=' + currentId)
            .then(response => response.json())
            .then(data => setTree(data));
    };

    return (
        <>
            <ul className={'tree tree-root ' + (currentDrag ? 'drag-ok' : '')}>
                {tree?.map((item, index) => {
                    return (
                        <TreeItem
                            key={index}
                            currentID={currentId}
                            item={item}
                            currentDrag={currentDrag}
                            setCurrentDrag={setCurrentDrag}
                            triggerReload={triggerReload}
                        />
                    );
                })}
            </ul>

            <NewPage />
        </>
    );
};

export default TreeView;
