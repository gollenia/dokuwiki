import React, { KeyboardEvent, useContext, useEffect, useRef, useState } from 'react';
import { FormattedNumber } from 'react-intl';
import fileSize from '../../services/fileSize';
import { Attachment } from '../../services/models/Attachment';
import { store } from '../../services/store';
import FileIcon from './FileIcon';

type Props = {
    index: number;
    file: Attachment;
};

const FileTableRow = (props: Props) => {
    const globalState = useContext(store);
    const {
        state: { article, files },
        dispatch,
    } = globalState;

    const { file, index } = props;

    const [renameMode, setRenameMode] = useState<boolean>(false);
    const [fileName, setFileName] = useState<string>(file.filename);

    const inputField = useRef<HTMLInputElement>();

    useEffect(() => {
        setFileName(file.filename);
    }, [files]);

    const deleteFile = () => {
        fetch('/?controller=media&method=delete&id=' + file.id)
            .then(response => response.json())
            .then(data => {
                if (!data) return;
                dispatch({ type: 'DELETE_FILE', payload: index });
            });
    };

    const renameFile = (event: KeyboardEvent) => {
        if (event.key == 'Escape') {
            setRenameMode(false);
            return;
        }

        if (event.key != 'Enter') return;

        if (fileName == file.filename) {
            setRenameMode(false);
            return;
        }

        const name = (event.target as HTMLInputElement).value;

        fetch(`/?controller=media&method=rename&id=${file.id}&name=${name}`)
            .then(response => response.json())
            .then(data => {
                if (!data) return;
                dispatch({ type: 'RENAME_FILE', payload: { index, name } });
            });

        setRenameMode(false);
    };

    const activateRenameMode = () => {
        setRenameMode(true);
        inputField?.current.focus();
    };

    const size = fileSize(file.size);

    return (
        <tr className="filetable-row">
            <td>
                <FileIcon className="filetable-icon" extension={file.extension} size={32} />
            </td>
            <td>
                {!renameMode && <a href={'/_media/' + file.id}>{file.filename}</a>}
                {renameMode && (
                    <input
                        ref={inputField}
                        autoFocus
                        onChange={event => setFileName(event.currentTarget.value)}
                        value={fileName}
                        onKeyDown={event => {
                            renameFile(event);
                        }}
                        className={'form-control form-control-sm ' + (!renameMode ? 'invisible' : '')}
                    />
                )}
            </td>
            <td>
                <span className="filetable-size">
                    <FormattedNumber value={size.value} unit={size.unit} style="unit" maximumSignificantDigits={3} />
                </span>
            </td>
            <td>{file.count}</td>
            <td>
                <div className="d-flex">
                    <a onClick={() => deleteFile()} className="filetable-action">
                        <i className=" material-symbols-outlined">close</i>
                    </a>
                    <a onClick={() => activateRenameMode()} className="filetable-action">
                        <i className=" material-symbols-outlined">drive_file_rename_outline</i>
                    </a>
                </div>
            </td>
        </tr>
    );
};

export default FileTableRow;
