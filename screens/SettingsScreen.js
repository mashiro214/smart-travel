import React from "react";
import styled from "styled-components";
import { Button } from "react-native";

class SettingsScreen extends React.Component {
	render() {
		return (
			<Container>
				<Text>Settings Screen</Text>
			</Container>
		);
	}
}

export default SettingsScreen;

const Container = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
`;

const Text = styled.Text``;
