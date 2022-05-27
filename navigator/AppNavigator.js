import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "../screens/HomeScreen";
import SectionScreen from "../screens/SectionScreen";
import TabNavigator from "./TabNavigator";

const AppNavigator = createStackNavigator(
	{
		Home: HomeScreen,
		Section: SectionScreen,
	},
	{
		mode: "modal",
		headerMode: "none",
	}
);

// use tabs
export default createAppContainer(TabNavigator);

// or
// export default createAppContainer(AppNavigator);
