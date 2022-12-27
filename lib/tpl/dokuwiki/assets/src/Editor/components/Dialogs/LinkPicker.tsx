import React, { useEffect, useState } from 'react';
import TreeItem from './TreeItem';

declare global {
    interface Window {
        DOKU_ID: string;
    }
}

export type Link = {
    id: string;
    url: string;
    title: string;
    placeholder: string;
};

type Props = {
    onChange: (target: Link) => void;
    showPicker: boolean;
    setShowPicker: (show: boolean) => void;
    title: string;
};

const LinkPicker = (props: Props) => {
    const { title, onChange, setShowPicker, showPicker } = props;

    const [tree, setTree] = useState([]);
    const [currentLink, setCurrentLink] = useState<Link>({
        id: '',
        url: '',
        title: '',
        placeholder: '',
    });

    useEffect(() => {
        if (!showPicker) return;
        setCurrentLink(link => {
            return { ...link, title: title };
        });
        fetch('/?controller=edit&method=tree')
            .then(response => response.json())
            .then(data => setTree(data));
    }, [showPicker]);

    const click = () => {
        onChange(currentLink);
        setShowPicker(false);
    };

    return (
        <>
            <div
                className={'modal modal-md fade ' + (showPicker ? 'show' : '')}
                style={{ display: showPicker ? 'block' : '' }}
                id="exampleModal"
                aria-labelledby="exampleModalLabel"
                aria-modal={showPicker}
                role="dialog"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                Link auswählen
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                aria-label="Close"
                                onClick={() => {
                                    setShowPicker(false);
                                }}
                            ></button>
                        </div>
                        <div className="container">
                            <ul className="tree tree-root link-tree">
                                {tree?.map((item, index) => {
                                    return (
                                        <TreeItem
                                            key={index}
                                            currentID={currentLink.id}
                                            item={item}
                                            onClickCallback={(id, title) => {
                                                setCurrentLink(link => {
                                                    return { ...link, id: id, placeholder: title };
                                                });
                                            }}
                                        />
                                    );
                                })}
                            </ul>
                            <div>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder={currentLink.placeholder}
                                    value={currentLink.title}
                                    onChange={event =>
                                        setCurrentLink(link => {
                                            return { ...link, title: event.target.value };
                                        })
                                    }
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={() => setShowPicker(false)}>
                                Abbrechen
                            </button>
                            <button className="btn btn-primary" onClick={() => click()}>
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {showPicker && <div className="modal-backdrop fade show"></div>}
        </>
    );
};

export default LinkPicker;
