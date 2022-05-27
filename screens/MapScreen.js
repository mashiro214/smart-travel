import React from "react";
import styled from "styled-components";
import { Button } from "react-native";

class MapScreen extends React.Component {
	render() {
		return (
			<Container>
				<Text>Map Screen</Text>
			</Container>
		);
	}
}

export default MapScreen;

const Container = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
`;

const Text = styled.Text``;
