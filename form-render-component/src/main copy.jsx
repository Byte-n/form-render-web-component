import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import style from './index.css?raw'

const safeJsonParse = (text) => {
  try {
    return JSON.parse(text);
  } catch {
    return null
  }
}

customElements.define('form-render', class extends HTMLElement {
	constructor() {
		super();

		const shadow = this.attachShadow({
			mode: 'open'
		});

		const wrapper = document.createElement('div');
		const type = document.createElement('style');
		type.innerHTML = style;
		shadow.appendChild(type);
		shadow.appendChild(wrapper);
    this.warpDivBox = wrapper;
    this.mount();
	}

  mount () {
    const schemeRaw = this.getAttribute('scheme');
    if (!schemeRaw) return;
    const scheme = JSON.parse(schemeRaw);
    console.log(scheme);
    const root = ReactDOM.createRoot(this.warpDivBox);
    this.root = root;
    const getForm = (f) => this.form = f;
    root.render(<App scheme={scheme} getForm={getForm} />);
  }

  unmount () {
    if (this.root) {
      this.root.unmount();
      this.root = null;
    }
  }

	attributeChangedCallback(name, oldValue, newValue) {
		if (name === 'scheme') {
      this.unmount();
			this.mount();
		}
	}

	static get observedAttributes() {
		return ['scheme'];
	}

  disconnectedCallback () {
    this.unmount();
  }
});

