import "../styles/app.scss";

const getController = (controller) => {
	switch (controller) {
		case 'cart':
			return import('./controllers/CartController');
		case 'pdp':
			return import('./controllers/PDPController');
		case 'plp':
			return import('./controllers/ProductListController');
		default:
			return import('./controllers/DefaultController');
	}
};

const hasController = (identifier) => {
	if (window.ttApp) {
		const identifiers = window.ttApp.controllers.filter(
			(ctrl) => ctrl.identifier === identifier
		);
		return identifiers.length > 0;
	}
	return false;
};

const loadControllers = async () => {
	if (window.ttApp) {
		const ctrlNodes = document.querySelectorAll('[data-controller]');
		for (let i = 0; i < ctrlNodes.length; i++) {
			const node = ctrlNodes[i];
			const ctrlNames = node.dataset.controller;
			if (ctrlNames) {
				const names = ctrlNames.split(' ').map((n) => n.trim());
				for (let j = 0; j < names.length; j++) {
					const ctrlName = names[j];
					if (!hasController(ctrlName)) {
						const ctrlScript = await getController(ctrlName);
						window.ttApp.register(ctrlName, ctrlScript.default);
					}
				}
			}
		}
	}
};
// With Turbolinks
document.addEventListener('turbolinks:load', loadControllers);

if (navigator.serviceWorker) {
	navigator.serviceWorker.register('/sw.js').then(function(registration) {
		console.log('ServiceWorker registration successful with scope:',  registration.scope);
	}).catch(function(error) {
		console.log('ServiceWorker registration failed:', error);
	});
}