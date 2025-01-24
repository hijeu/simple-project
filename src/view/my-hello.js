import { LitElement, html, css } from "lit";

export class MyHello extends LitElement {
	render() {
		return html`<h1>Hello</h1>`;
	}

	static get styles() {
		return css``;
	}
}

customElements.define("my-hello", MyHello);
