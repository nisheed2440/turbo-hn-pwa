export default class MOApp {
	constructor(selector = '[data-controller]') {
		// Set mutation observer
		this.MutationObserver =
			window.MutationObserver ||
			window.WebKitMutationObserver ||
			window.MozMutationObserver;

		this.config = {
			attributes: true,
			childList: true,
			subtree: true,
			characterData: true,
		};

		this.observer = null;
		this.selector = selector;
	}

	removedNodesHandler = (removedNodes) => {
		if (removedNodes && removedNodes.length > 0) {
			// element added to DOM
			var removedElements = [].filter.call(removedNodes, (el) => {
				return $(el).is(this.selector);
			});
			if (removedElements) {
				// element has class `MyClass`
				console.log(removedElements);
			}
		}
	}

	addedNodesHandler = (addedNodes) => {
		if (addedNodes && addedNodes.length > 0) {
			// element added to DOM
			var elements = [].filter.call(addedNodes, (el) => {
				return $(el).is(this.selector);
			});
			if (elements) {
				// element has class `MyClass`
				console.log(elements);
			}
		}
	}

	mutationHandler = (mutations) => {
		mutations.forEach((mutation) => {
			this.removedNodesHandler(mutation.removedNodes);
			this.addedNodesHandler(mutation.addedNodes);
		});
	}

	observe() {
		if (!this.observer) {
			this.observer = new MutationObserver(this.mutationHandler);
			this.observer.observe(document.body, this.config);
		}
	}

	disconnect() {
		if (this.observer) {
			this.observer.disconnect();
		}
	}
}
