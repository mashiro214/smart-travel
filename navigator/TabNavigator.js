import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import HomeScreen from "../screens/HomeScreen";
import SectionScreen from "../screens/SectionScreen";
import { Ionicons } from "@expo/vector-icons";
import MapScreen from "../screens/MapScreen";
import SettingsScreen from "../screens/SettingsScreen";

const activeColor = "#4775f2";
const inactiveColor = "#b8bece";

const HomeStack = createStackNavigator(
	{
		Home: HomeScreen,
		Section: SectionScreen,
	},
	{
		mode: "modal",
		headerMode: "none",
	}
);

HomeStack.navigationOptions = ({ navigation }) => {
	var tabBarVisible = true;

	const routeName = navigation.state.routes[navigation.state.index].routeName;

	if (routeName == "Section") {
		tabBarVisible = false;
	}

	return {
		tabBarVisible,
		tabBarLabel: "Home",
		tabBarIcon: ({ focused }) => <Ionicons name="ios-home" size={26} color={focused ? activeColor : inactiveColor} />,
	};
};

const MapStack = createStackNavigator({
	Map: MapScreen,
});

MapStack.navigationOptions = {
	tabBarLabel: "Map",
	tabBarIcon: ({ focused }) => <Ionicons name="ios-map" size={26} color={focused ? activeColor : inactiveColor} />,
};

const SettingsStack = createStackNavigator({
	Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
	tabBarLabel: "Settings",
	tabBarIcon: ({ focused }) => <Ionicons name="ios-settings" size={26} color={focused ? activeColor : inactiveColor} />,
};

const TabNavigator = createBottomTabNavigator({
	HomeStack,
	MapStack,
	SettingsStack,
});

export default TabNavigator;
