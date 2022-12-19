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
}

const TreeItem = (props: TreeItemProps) => {
    const { item, currentID } = props;

    const [open, setOpen] = useState<boolean>(false);
    const [addPage, setAddPage] = useState<boolean>(false);

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

    return (
        <li className={classes}>
            {!item.children && (
                <span>
                    <img src={item.is_new ? newFileIcon : fileIcon} width="16px" height="16px" />{' '}
                    <a href={'/' + item.id}>{item.title}</a>
                </span>
            )}
            {item.children && (
                <>
                    <span>
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
                        {item.children.map((child, index) => {
                            return <TreeItem key={index} currentID={currentID} item={child} />;
                        })}
                    </ul>
                </>
            )}
        </li>
    );
};

export default TreeItem;
