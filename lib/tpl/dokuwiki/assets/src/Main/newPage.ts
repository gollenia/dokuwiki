const newPage = (id: string) => {
	const newPageModal = document.getElementById('newPageModal');
	const newPageInput = document.getElementById('newPageInput') as HTMLInputElement;
	if(!newPageInput) return;
	newPageInput.value = id

	newPageModal?.classList.add('open');
}

const setNewPageId = (id: string) => {
	const newPageInput = document
}