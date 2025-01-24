import { LitElement, html, css } from "lit";
import { BASE } from "../router";

export class NavigationBar extends LitElement {
	render() {
		return html`
			<nav>
				<a href="${BASE}">Hello</a>
				<a href="${BASE}element">Counter</a>
				<a href="${BASE}users/1">User 1</a>
				<a href="${BASE}users/2">User 2</a>
				<a href="${BASE}users/5">User 5</a>
			</nav>
		`;
	}

	static get styles() {
		return css`
			nav {
				width: 100%;
				display: flex;
				justify-content: space-evenly;
				position: sticky;
				z-index: 1;
				align-items: center;
				background: blue;
				top: 0;
			}

			nav a {
				padding: 10px;
				flex-grow: 1;
				border: solid 1px lightblue;
				text-align: center;
			}
		`;
	}
}

customElements.define("navigation-bar", NavigationBar);
