import Navigation from "./Navigation/Navigation";
import { Provider } from "react-redux";
import React from "react";
import Store from "./Store/configureStore";

export default function App() {
	return (
		<Provider store={Store}>
			<Navigation />
		</Provider>
	);
}
