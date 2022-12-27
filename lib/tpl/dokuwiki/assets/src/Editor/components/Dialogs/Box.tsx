import React, { useState } from 'react';

interface Props {
    showBox: boolean;
    setShowBox: (show: boolean) => void;
    onChange: (boxSyntax: string) => void;
}

export type Box = {
    background?: string;
    title?: string;
    inline: boolean;
};

const Box = (props: Props) => {
    const { showBox, onChange, setShowBox } = props;
    const [boxObject, setBoxObject] = useState<Box>({
        background: '#eeeeee',
        title: '',
        inline: false,
    });

    const [error, setError] = useState<string>('');

    const createSyntax = () => {
        return `<box title="${boxObject.title}" inline="${boxObject.inline ? 1 : 0}" background="${
            boxObject.background
        }">`;
    };

    const clickOk = () => {
        onChange(createSyntax());
        setShowBox(false);
    };

    return (
        <>
            <div
                className={'modal modal-md fade ' + (showBox ? 'show' : '')}
                style={{ display: showBox ? 'block' : '' }}
                id="exampleModal"
                aria-labelledby="exampleModalLabel"
                aria-modal={showBox}
                role="dialog"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                Box einfügen
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                aria-label="Close"
                                onClick={() => {
                                    setShowBox(false);
                                }}
                            ></button>
                        </div>
                        <div className="container">
                            <div className="mb-4">
                                <label>Title</label>
                                <input
                                    className={'form-control' + (error ? ' is-invalid' : '')}
                                    type="text"
                                    value={boxObject.title}
                                    onChange={event =>
                                        setBoxObject(box => {
                                            return { ...box, title: event.target.value };
                                        })
                                    }
                                />
                                {error && <div className="invalid-feedback">{error}</div>}
                            </div>

                            <div className="d-flex align-items-center mb-4">
                                <input
                                    className={'form-control' + (error ? ' is-invalid' : '')}
                                    type="color"
                                    value={boxObject.background}
                                    onChange={event =>
                                        setBoxObject(box => {
                                            return { ...box, background: event.target.value };
                                        })
                                    }
                                />
                                <label>Farbe</label>
                                {error && <div className="invalid-feedback">{error}</div>}
                            </div>
                            <div className="form-check mb-4">
                                <input
                                    className={'form-check-input' + (error ? ' is-invalid' : '')}
                                    type="checkbox"
                                    id="checkInline"
                                    checked={boxObject.inline}
                                    onChange={event =>
                                        setBoxObject(box => {
                                            return { ...box, inline: !!event.target.checked };
                                        })
                                    }
                                />
                                <label className="form-check-label" htmlFor="checkInline">
                                    Als Inline-Element behandeln
                                </label>
                                {error && <div className="invalid-feedback">{error}</div>}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={() => setShowBox(false)}>
                                Abbrechen
                            </button>
                            <button className="btn btn-primary" onClick={() => clickOk()}>
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {showBox && <div className="modal-backdrop fade show"></div>}
        </>
    );
};

export default Box;
