import React, { useState } from 'react';

type ExternalLinkProps = {
    onChange: (data: any) => void;
    setOpen: (open: boolean) => void;
    open: boolean;
};

const ExternalLink = (props: ExternalLinkProps) => {
    const [link, setLink] = useState<{
        title: string;
        url: string;
        newTab: boolean;
    }>({ title: '', url: '', newTab: true });

    const { onChange, setOpen, open } = props;

    const click = () => {
        onChange('<a href="' + link.url + '" ' + (link.newTab ? 'target="_blank"' : '') + '>' + link.title + '</a>');
        setOpen(false);
    };

    return (
        <>
            <div
                className={'modal modal-md fade ' + (open ? 'show' : '')}
                style={{ display: open ? 'block' : '' }}
                id="externalLink"
                aria-labelledby="exampleModalLabel"
                aria-modal={open}
                role="dialog"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                Externer Link
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                aria-label="Close"
                                onClick={() => {
                                    setOpen(false);
                                }}
                            ></button>
                        </div>
                        <div className="container d-flex flex-column" style={{ gap: '1rem' }}>
                            <input
                                className="form-control"
                                type="url"
                                placeholder="https://example.com"
                                value={link.url}
                                onChange={event =>
                                    setLink({
                                        ...link,
                                        url: event.target.value,
                                    })
                                }
                            />

                            <input
                                className="form-control"
                                type="text"
                                placeholder="Titel"
                                value={link.title}
                                onChange={event => setLink({ ...link, title: event.target.value })}
                            />

                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
                                <input
                                    type="checkbox"
                                    checked={link.newTab}
                                    onChange={event => setLink({ ...link, newTab: event.target.checked })}
                                />
                                Neues Tab öffnen
                            </label>
                        </div>

                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={() => setOpen(false)}>
                                Abbrechen
                            </button>
                            <button className="btn btn-primary" onClick={() => click()}>
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {open && <div className="modal-backdrop fade show"></div>}
        </>
    );
};

export default ExternalLink;
