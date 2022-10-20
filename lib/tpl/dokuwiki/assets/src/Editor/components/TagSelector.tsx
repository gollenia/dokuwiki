import React, { useEffect, useRef, useState } from 'react';
import { Tag } from '../services/models/Site';

interface TagSelectorProps {
	availableTags: Array<Tag>
	placeholder?: string
	default?: string | number
	savedTags?: Array<string>
	onChange?: (option: Array<string>) => void
}

const TagSelector: React.FC<TagSelectorProps> = (props) => {

	const { availableTags, onChange, placeholder, savedTags } = props;
	

	const input = useRef<HTMLInputElement>(null);

	const [inputField, setInputField] = useState<string>('');
	const [selection, setSelection] = useState<number>(-1);
	const [listSelect, setListSelect] = useState<number>(-1);
	const [tagList, setTagList] = useState<Array<Tag>>([])

	console.log(tagList)

	useEffect(() => {
		
		const filteredTags = savedTags.filter((tag) => {
			return availableTags.find((i) => i.id == tag)
		}).map((tag) => {
			return availableTags.find((i) => i.id == tag)
		})

		setTagList(filteredTags)
		
	}, [savedTags])

	const dropdownSelect = (value: string | number, update = true) => {
		const index = availableTags.findIndex((option) => option.id == value)
		setSelection(index);
		setInputField("");
		input.current.value = "";

		console.log("adding", availableTags[index], "to", tagList)
		setTagList(tags => [...tags, availableTags[index]])
		if (onChange && update) {
			const tags = [...tagList, availableTags[index]].map((tag) => tag.id)
			console.log("tag", tags)
			onChange(tags)
		}
	}

	

	const filteredOptions = () => {
		if (inputField.length === 0) return availableTags;
		if (inputField.slice(-1) == "*") {
			return availableTags.filter((option) => option.name.startsWith(inputField.slice(0, -1).toLowerCase()))
		}
		return availableTags.filter((option) => option.name.includes(inputField.toLowerCase()))
	}

	const keyPress = (event: any) => {
		console.log(event)
		if (event.key == "ArrowDown") {
			console.log('down')
			setListSelect(listSelect + 1)
		}
		if (event.key == "ArrowUp" && listSelect != -1) setListSelect(listSelect - 1)
		if (event.key == "Enter") {
			dropdownSelect(filteredOptions()[listSelect].id);
		}
		if (event.key == "Escape") {
			setListSelect(-1);
			input.current?.blur();
		}
	}

	const removeTag = (index: number) => {
		setTagList((tags) => { return tags.splice(index,1)})
	}


	return (
		<div>
			<div className="tagList tags mb-4 mt-2"> { tagList.map((tagList, index) => {
				return <span className='badge tag bg-primary'>{tagList.name}<i className="material-icons" onClick={() => {removeTag(index)}}>cancel</i></span>} ) } 
			</div>
			<div className='combobox' onKeyDown={(event) => keyPress(event)}>
				<label>Schlagworte hinzufügen</label>
				<input className="form-control" ref={input} type="text" onMouseOver={() => { setListSelect(-1) }} onClick={(event) => { }} placeholder={selection != -1 ? availableTags[selection].id : placeholder} value={inputField} onChange={(event) => setInputField(event.target.value)} />
				<ul>
					{filteredOptions().map((option, index) => {
						return <li className={listSelect == index ? "selected" : ''} onMouseDown={(event) => { dropdownSelect(option.id) }} key={index}>
							{option.name}
						</li>
					})}
					{filteredOptions().length == 0 &&
						<li className="muted">No Result</li>
					}
				</ul>
		</div>
		</div>
		
	)
}

TagSelector.defaultProps = {
	placeholder: '',
	savedTags: [],

}

export default TagSelector