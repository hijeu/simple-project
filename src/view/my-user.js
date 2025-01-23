import { LitElement, html, css } from "lit";
import { router } from "../router";

export class MyUser extends LitElement {
	connectedCallback() {
		super.connectedCallback();
		this.userId = router.location.getUrl().split("/").pop();
	}

	render() {
		return html` <h1>Hello User ${this.userId}</h1>`;
	}

	static get styles() {
		return css``;
	}
}

customElements.define("my-user", MyUser);
