import React, { useRef, useState } from 'react';
import { Tag } from '../services/models/Site';

interface TagSelectorProps {
    availableTags: Array<Tag>;
    placeholder?: string;
    default?: string | number;
    tagList?: Array<string>;
    disabled?: boolean;
    onChange?: (option: Array<string>) => void;
}

const TagSelector: React.FC<TagSelectorProps> = props => {
    let { availableTags, onChange, placeholder, tagList, disabled } = props;

    const input = useRef<HTMLInputElement>(null);

    if (typeof tagList === 'string') {
        tagList = [tagList];
    }

    const [inputField, setInputField] = useState<string>('');
    const [selection, setSelection] = useState<number>(-1);
    const [listSelect, setListSelect] = useState<number>(-1);

    const dropdownSelect = (value: string, update = true) => {
        const index = availableTags.findIndex(option => option.id == value);
        setSelection(index);
        setInputField('');
        input.current.value = '';
        onChange([...tagList, value]);
    };

    const filteredOptions = () => {
        const unselectedAvailableTags = availableTags.filter(tag => !tagList.includes(tag.id));
        if (inputField.length === 0) return unselectedAvailableTags;

        return unselectedAvailableTags.filter(option => {
            return option.name.toLocaleLowerCase().includes(inputField.toLowerCase());
        });
    };

    const keyPress = (event: any) => {
        if (event.key == 'ArrowDown') {
            setListSelect(listSelect + 1);
        }
        if (event.key == 'ArrowUp' && listSelect != -1) setListSelect(listSelect - 1);
        if (event.key == 'Enter') {
            dropdownSelect(filteredOptions()[listSelect].id);
            input.current.value = '';
        }
        if (event.key == 'Escape') {
            setListSelect(-1);
            input.current?.blur();
        }
    };

    const removeTag = (index: number) => {
        tagList.splice(index, 1);
        onChange(tagList);
    };

    return (
        <div>
            <div className={'tagList tags mb-4 mt-2 ' + (disabled ? 'disabled' : '')}>
                {' '}
                {tagList.map((tagId, index) => {
                    const tag = availableTags.find(item => item.id == tagId);
                    if (!tag) return;
                    return (
                        <span className={'badge tag ' + (disabled ? 'bg-secondary' : 'bg-purple')}>
                            {tag.name}
                            {!disabled && (
                                <i
                                    className="material-symbols-outlined"
                                    onClick={() => {
                                        removeTag(index);
                                    }}
                                >
                                    cancel
                                </i>
                            )}
                        </span>
                    );
                })}
            </div>
            <label>Schlagworte hinzufügen</label>
            <div className={'combobox ' + (disabled ? 'disabled' : '')} onKeyDown={event => keyPress(event)}>
                <input
                    className="form-control"
                    ref={input}
                    type="text"
                    disabled={disabled}
                    onMouseOver={() => {
                        setListSelect(-1);
                    }}
                    onClick={event => {}}
                    //placeholder={selection != -1 ? availableTags[selection].id : placeholder}
                    value={inputField}
                    onChange={event => setInputField(event.target.value)}
                />
                <ul>
                    {filteredOptions().map((option, index) => {
                        return (
                            <li
                                className={listSelect == index ? 'selected' : ''}
                                onMouseDown={event => {
                                    dropdownSelect(option.id);
                                }}
                                key={index}
                            >
                                {option.name}
                            </li>
                        );
                    })}
                    {filteredOptions().length == 0 && <li className="muted">No Result</li>}
                </ul>
            </div>
        </div>
    );
};

TagSelector.defaultProps = {
    placeholder: '',
    disabled: false,
};

export default TagSelector;
