import { Router } from "@vaadin/router";
import { MyHello } from "./view/my-hello";
import { MyElement } from "./view/my-element";
import { MyUser } from "./view/my-user";

const outlet = document.querySelector("#outlet");
const router = new Router(outlet);

// import.meta.env.BASE_URL is a global variable defined in `vite.config.js`.
const BASE = import.meta.env.BASE_URL ?? "/";

router.setRoutes([
	{ path: `${BASE}`, component: "my-hello" },
	{ path: `${BASE}element`, component: "my-element" },
	{ path: `${BASE}users/:user`, component: "my-user" },
]);

export { router };
