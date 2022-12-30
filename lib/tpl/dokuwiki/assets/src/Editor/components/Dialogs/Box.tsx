import React, { useState } from 'react';

interface Props {
    content?: string;
    showBox: boolean;
    setShowBox: (show: boolean) => void;
    onChange: (boxSyntax: string) => void;
}

export type Box = {
    background?: string;
    color?: string;
    inline: boolean;
    padding?: number;
    marginTop?: number;
    marginBottom?: number;
};

const Box = (props: Props) => {
    const { showBox, onChange, setShowBox } = props;
    const [boxObject, setBoxObject] = useState<Box>({
        background: '#eeeeee',
        inline: false,
        padding: 1.5,
    });

    const [error, setError] = useState<string>('');

    const createSyntax = () => {
        let box = '<box ';
        if (boxObject.padding) box += `padding="${boxObject.padding}rem" `;
        if (boxObject.inline) box += 'inline="1" ';
        if (boxObject.color) box += `color="${boxObject.color}" `;
        if (boxObject.background) box += `background="${boxObject.background}" `;
        box = box.trim() + '>';
        box += boxObject.inline ? '' : '\n';

        return box;
    };

    const clickOk = () => {
        onChange(createSyntax());
        setShowBox(false);
    };

    const exampleStyle = {
        backgroundColor: boxObject.background,
        color: boxObject.color,
        paddingTop: boxObject.inline ? '3px' : boxObject.padding + 'rem',
        paddingBottom: boxObject.inline ? '3px' : boxObject.padding + 'rem',
        paddingLeft: boxObject.inline ? '5px' : boxObject.padding + 'rem',
        paddingRight: boxObject.inline ? '5px' : boxObject.padding + 'rem',
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
                            <div className="d-flex align-items-center mb-4 gap-4">
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
                                <label>Hintergrundfarbe</label>
                                {error && <div className="invalid-feedback">{error}</div>}
                            </div>
                            <div className="d-flex align-items-center mb-4 gap-4">
                                <input
                                    className={'form-control' + (error ? ' is-invalid' : '')}
                                    type="color"
                                    value={boxObject.color}
                                    onChange={event =>
                                        setBoxObject(box => {
                                            return { ...box, color: event.target.value };
                                        })
                                    }
                                />
                                <label>Textfarbe</label>
                                {error && <div className="invalid-feedback">{error}</div>}
                            </div>
                            <div className="mb-4 d-flex align-items-center gap-4">
                                <label htmlFor="padding-slider">Innenabstand</label>
                                <input
                                    className={'form-range' + (error ? ' is-invalid' : '')}
                                    type="range"
                                    max="4"
                                    min="0"
                                    step="0.5"
                                    disabled={boxObject.inline}
                                    id="padding-slider"
                                    value={boxObject.padding}
                                    onChange={event =>
                                        setBoxObject(box => {
                                            return { ...box, padding: parseFloat(event.target.value) };
                                        })
                                    }
                                />
                                <b>{boxObject.padding} rem</b>
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
                                    In den Fließtext einbinden
                                </label>
                                {error && <div className="invalid-feedback">{error}</div>}
                            </div>

                            <div className="mb-4">
                                {boxObject.inline ? (
                                    <p>
                                        sit amet, consetetur sadipscing elitr,{' '}
                                        <span style={exampleStyle}>sed diam nonumy</span> eirmod tempor invidunt ut
                                        labore et dolore magna aliquyam erat, sed diam voluptua.
                                    </p>
                                ) : (
                                    <div className="box-example" style={exampleStyle}>
                                        <h3>Lorem ipsum dolor</h3>
                                        <p>
                                            sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                                            invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
                                        </p>
                                    </div>
                                )}
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
