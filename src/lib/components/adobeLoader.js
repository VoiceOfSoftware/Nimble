// src/lib/adobeLoader.js
let adobeLoaded = null;
let counter = 0;

/**
 * Loads the AdobeDC View SDK script once in the browser and returns a promise that resolves when loaded.
 * @returns {Promise<void>}
 */
export async function loadAdobe() {
	const { browser } = await import('$app/environment');
	if (!browser) {
		console.log('loadAdobe skipped on server');
		return Promise.resolve();
	}

	if (!adobeLoaded) {
		if (document.querySelector('script[src="https://acrobatservices.adobe.com/view-sdk/viewer.js"]')) {
			console.log('AdobeDC script already present in DOM');
			if (typeof window.AdobeDC !== 'undefined') {
				console.log('AdobeDC already initialized');
				return Promise.resolve();
			}
		}

		adobeLoaded = new Promise((resolve, reject) => {
			if (typeof window.AdobeDC !== 'undefined') {
				console.log('AdobeDC already available before script load');
				resolve();
				return;
			}

			const script = document.createElement('script');
			script.src = 'https://acrobatservices.adobe.com/view-sdk/viewer.js';
			script.async = true;
			script.onload = () => {
				console.log('AdobeDC script load event fired');
				setTimeout(() => {
					if (typeof window.AdobeDC !== 'undefined') {
						console.log('AdobeDC initialized successfully:', window.AdobeDC);
						resolve();
					} else {
						console.error('AdobeDC not found after script load');
						reject(new Error('AdobeDC not initialized after script load'));
					}
				}, 500);
			};
			script.onerror = () => {
				console.error('AdobeDC script failed to load from network');
				reject(new Error('Failed to load AdobeDC script'));
			};
			document.head.appendChild(script);
		});
	}
	return adobeLoaded;
}

/**
 * Generates a unique ID for each PDF viewer div.
 * @returns {string} A unique ID in the format 'pdf-div-<number>'.
 */
export function getUniqueId() {
	counter++;
	return `pdf-div-${counter}`;
}