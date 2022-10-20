import Alpine from 'alpinejs';
import 'Main/newPage';

declare global {
    interface Window { Alpine: typeof Alpine }
}

window.Alpine = Alpine
Alpine.start()

document.addEventListener('alpine:init', () => {
	Alpine.data('newPage', () => ({
		open: false,

		toggle() {
			this.open = ! this.open
		},
	}))
})

// Listen for the event.
document.addEventListener('newPage', (e) => { /* … */ }, false);

