import React, { useEffect, useRef, useState } from 'react';
import removeAccents from 'remove-accents';

import fileIcon from './img/file.svg';
import newFileIcon from './img/file_new.svg';
import folderIcon from './img/folder.svg';

type TreeItemType = {
    children: Array<TreeItemType> | undefined;
    title: string;
    id: string;
    is_new?: boolean;
};

interface TreeItemProps {
    item: TreeItemType;
    currentID: string;
    currentDrag: string;
    triggerReload: () => void;
    setCurrentDrag: (value: string) => void;
}

const TreeItem = (props: TreeItemProps) => {
    const { item, currentID, currentDrag, setCurrentDrag } = props;

    const [open, setOpen] = useState<boolean>(false);
    const [addPage, setAddPage] = useState<boolean>(false);
    const [draggOver, setDraggOver] = useState<boolean>(false);
    const [dragging, setDragging] = useState<boolean>(false);

    const toggleOpen = () => {
        setOpen(!open);
    };

    const inputField = useRef<HTMLInputElement>();

    useEffect(() => {
        if (currentID.includes(item.id)) setOpen(true);
    }, []);

    const classes = [open ? 'open' : false, item.children ? 'folder' : 'file', item.id == currentID ? 'active' : false]
        .filter(Boolean)
        .join(' ');

    const activateAddPage = () => {
        setAddPage(true);
        setOpen(true);
    };

    const inputKeyDown = (event: React.KeyboardEvent) => {
        if (event.key == 'Enter') {
            if (!inputField.current.value) {
                setAddPage(false);
                return;
            }

            let newPage: string = inputField.current.value;
            newPage = newPage.replace(' ', '_');
            newPage = removeAccents(newPage);
            window.location.href = `/${item.id}:${newPage}`;
        }

        if (event.key == 'Escape') {
            setAddPage(false);
            inputField.current.value = '';
        }
    };
    const dragStart = (event: React.DragEvent) => {
        setDragging(true);
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.dropEffect = 'move';
    };

    const dragEnter = (event: React.DragEvent) => {
        event.preventDefault();
        setDraggOver(true);
        setCurrentDrag(item.id);
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.dropEffect = 'move';
    };

    const dragLeave = (event: React.DragEvent) => {
        event.preventDefault();
        setDraggOver(false);
        setCurrentDrag('');
        event.dataTransfer.effectAllowed = 'none';
    };

    const dragOver = (event: React.DragEvent) => {
        event.preventDefault();
        setDraggOver(true);
        setCurrentDrag(item.id);
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.dropEffect = 'move';
    };

    const dragEnd = (e: React.DragEvent) => {
        setDragging(false);
        setDraggOver(false);
        if (item.id == currentDrag) return;
        if (confirm(`Seite ${item.id} nach ${currentDrag} verschieben?`) == false) return;
        fetch('/?controller=edit&method=move_page&target=' + currentDrag + '&id=' + item.id)
            .then(response => response.json())
            .then(data => {
                props.triggerReload();
            });
    };

    const drop = (event: React.DragEvent) => {
        event.preventDefault();
        setDraggOver(false);
        event.dataTransfer.effectAllowed = 'none';
    };

    return (
        <li className={classes}>
            {!item.children ? (
                <span
                    onDragStart={event => dragStart(event)}
                    onDragEnd={dragEnd}
                    className={dragging ? 'dragging' : ''}
                    draggable={true}
                >
                    <img src={item.is_new ? newFileIcon : fileIcon} width="16px" height="16px" />
                    <a href={'/' + item.id} draggable={false}>
                        {item.title}
                    </a>
                </span>
            ) : (
                <>
                    <span
                        onDragEnter={e => dragEnter(e)}
                        onDragOver={e => dragOver(e)}
                        onDragLeave={e => dragLeave(e)}
                        onDrop={e => drop(e)}
                        className={draggOver ? 'drag-over' : ''}
                    >
                        <i onClick={() => toggleOpen()} className="material-symbols-outlined icon-chevron">
                            chevron_right
                        </i>
                        <img src={folderIcon} width="16px" height="16px" />
                        <a href={'/' + item.id}>{item.title}</a>
                        <i className="add-page material-symbols-outlined" onClick={() => activateAddPage()}>
                            add
                        </i>
                    </span>
                    <ul>
                        {addPage && (
                            <li>
                                <input
                                    className="fomr-control new-page-input"
                                    autoFocus
                                    onKeyDown={event => {
                                        inputKeyDown(event);
                                    }}
                                    ref={inputField}
                                    type="text"
                                />
                            </li>
                        )}
                        {item.children.map((child: any, index: any) => {
                            return (
                                <TreeItem
                                    key={index}
                                    currentID={currentID}
                                    item={child}
                                    currentDrag={currentDrag}
                                    setCurrentDrag={setCurrentDrag}
                                    triggerReload={props.triggerReload}
                                />
                            );
                        })}
                    </ul>
                </>
            )}
        </li>
    );
};

export default TreeItem;
