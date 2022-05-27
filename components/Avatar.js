import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

function mapStateToProps(state) {
	return {
		name: state.name,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		updateName: name =>
			dispatch({
				type: "UPDATE_NAME",
				name: name,
			}),
	};
}

class Avatar extends React.Component {
	// initial state
	state = {
		// default url
		photo: "https://cl.ly/55da82beb939/download/avatar-default.jpg",
	};

	componentDidMount() {
		fetch("https://randomuser.me/api/")
			// transform to json first
			.then(response => response.json())
			// using the response
			.then(response => {
				console.log(response);
				this.setState({
					// change state
					photo: response.results[0].picture.thumbnail,
				});
				this.props.updateName(response.results[0].name.first);
			});
	}

	render() {
		return <Image source={{ uri: this.state.photo }} />;
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Avatar);

const Image = styled.Image`
	width: 44px;
	height: 44px;
	border-radius: 22px;
`;
