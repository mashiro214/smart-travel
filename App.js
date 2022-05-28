import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import HomeScreen from "./screens/HomeScreen";
import AppNavigator from "./navigator/AppNavigator";
import { LogBox } from "react-native";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

// client access to Contentful
const client = new ApolloClient({
	uri: "https://graphql.contentful.com/content/v1/spaces/z5ui7o420lkc",
	credentials: "same-origin",
	headers: {
		Authorization: `Bearer qxbc_UQWulK8HYHtWVowQoTNj14vFHhiYeQ_9QX-19A`,
	},
});

LogBox.ignoreLogs(["EventEmitter.removeListener"]);
LogBox.ignoreLogs(["Expected style"]);

const initialState = {
	action: "",
	name: "",
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case "OPEN_MENU":
			return { action: "openMenu" };
		case "CLOSE_MENU":
			return { action: "closeMenu" };
		case "UPDATE_NAME":
			return { name: action.name };
		default:
			return state;
	}
};

const store = createStore(reducer);

const App = () => (
	<ApolloProvider client={client}>
		<Provider store={store}>
			<AppNavigator />
		</Provider>
	</ApolloProvider>
);

export default App;
