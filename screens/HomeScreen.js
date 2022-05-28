import { setStatusBarStyle } from "expo-status-bar";
import { ScrollView, SafeAreaView, TouchableOpacity, Animated, Easing } from "react-native";
import styled from "styled-components";
import Card from "../components/Card";
import Ionicons from "@expo/vector-icons/Ionicons";
import { NotificationIcon } from "../components/Icons";
import Logo from "../components/Logo";
import Place from "../components/Places";
import Menu from "../components/Menu";
import { connect } from "react-redux";
import React from "react";
import Avatar from "../components/Avatar";
import gql from "graphql-tag";
import { Query } from "react-apollo";

// Query to Contentful using GraphQL
const CardsQuery = gql`
	{
		cardsCollection {
			items {
				title
				subtitle
				image {
					title
					description
					contentType
					fileName
					size
					url
					width
					height
				}
				subtitle
				caption
				logo {
					title
					description
					contentType
					fileName
					size
					url
					width
					height
				}
			}
		}
	}
`;

function mapStateToProps(state) {
	return { action: state.action, name: state.name };
}

function mapDispatchToProps(dispatch) {
	return {
		openMenu: () =>
			dispatch({
				type: "OPEN_MENU",
			}),
	};
}

class HomeScreen extends React.Component {
	state = {
		scale: new Animated.Value(1),
		opacity: new Animated.Value(1),
	};

	componentDidMount() {
		setStatusBarStyle("dark");
	}

	componentDidUpdate() {
		this.toggleMenu();
	}

	toggleMenu = () => {
		if (this.props.action == "openMenu") {
			Animated.timing(this.state.scale, {
				useNativeDriver: false,
				toValue: 0.9,
				duration: 300,
				easing: Easing.in(),
			}).start();
			Animated.spring(this.state.opacity, {
				useNativeDriver: false,
				toValue: 0.5,
			}).start();

			setStatusBarStyle("light");
		}

		if (this.props.action == "closeMenu") {
			Animated.timing(this.state.scale, {
				useNativeDriver: false,
				toValue: 1,
				duration: 300,
				easing: Easing.in(),
			}).start();
			Animated.spring(this.state.opacity, {
				useNativeDriver: false,
				toValue: 1,
			}).start();
			setStatusBarStyle("dark");
		}
	};

	render() {
		return (
			<RootView>
				<Menu />
				<AnimatedContainer style={{ transform: [{ scale: this.state.scale }], opacity: this.state.opacity }}>
					<SafeAreaView>
						<ScrollView>
							<TitleBar>
								<TouchableOpacity style={{ position: "absolute", top: 0, left: 20 }}>
									<Avatar />
								</TouchableOpacity>
								<Title>Welcome back,</Title>
								<Name>{this.props.name}</Name>
								<NotificationIcon style={{ position: "absolute", right: 20, top: 5 }}></NotificationIcon>
							</TitleBar>
							<ScrollView
								style={{ flexDirection: "row", padding: 20, paddingLeft: 12, paddingTop: 30 }}
								horizontal={true}
								showsHorizontalScrollIndicator={false}
							>
								{logos.map((logo, index) => (
									<TouchableOpacity key={index} onPress={this.props.openMenu}>
										<Logo image={logo.image} text={logo.text} />
									</TouchableOpacity>
								))}
							</ScrollView>
							<Subtitle>Recent Places</Subtitle>
							<ScrollView horizontal={true} style={{ paddingBottom: 30 }} showsHorizontalScrollIndicator={false}>
								<Query query={CardsQuery}>
									{({ loading, error, data }) => {
										if (loading) return <Message>Loading...</Message>;
										if (error) return <Message>Error...</Message>;

										console.log(data.cardsCollection.items);

										return (
											<CardsContainer>
												{data.cardsCollection.items.map((card, index) => (
													<TouchableOpacity
														key={index}
														onPress={() => {
															this.props.navigation.push("Section", {
																// passing information to new screen
																section: card,
															});
														}}
													>
														<Card
															title={card.title}
															image={card.image}
															caption={card.caption}
															logo={card.logo}
															subtitle={card.subtitle}
														></Card>
													</TouchableOpacity>
												))}
											</CardsContainer>
										);
									}}
								</Query>
							</ScrollView>
							<Subtitle>Recommended Places</Subtitle>
							{places.map((place, index) => (
								<Place
									key={index}
									image={place.image}
									title={place.title}
									subtitle={place.subtitle}
									logo={place.logo}
									author={place.author}
									avatar={place.avatar}
									caption={place.caption}
								/>
							))}
						</ScrollView>
					</SafeAreaView>
				</AnimatedContainer>
			</RootView>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const Message = styled.Text`
	margin: 20px;
	color: #b8bece;
	font-size: 15px;
	font-weight: 500;
`;

const CardsContainer = styled.View`
	flex-direction: row;
`;

const RootView = styled.View`
	background: black;
	flex: 1;
`;

const Subtitle = styled.Text`
	color: #b8bece;
	font-weight: 600;
	font-size: 15px;
	margin-left: 20px;
	margin-top: 20px;
	text-transform: uppercase;
`;

const Container = styled.View`
	flex: 1;
	background-color: #f0f3f5;
	border-top-left-radius: 10px;
	border-top-right-radius: 10px;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const Title = styled.Text`
	font-size: 16px;
	color: #b8bece;
	font-weight: 500;
`;

const Name = styled.Text`
	font-size: 20px;
	color: #3c4560;
	font-weight: bold;
`;

const TitleBar = styled.View`
	width: 100%;
	margin-top: 50px;
	padding-left: 80px;
`;

const logos = [
	{
		image: require("../assets/restaurant.png"),
		text: "Restaurants",
	},
	{
		image: require("../assets/mall.png"),
		text: "Malls",
	},
	{
		image: require("../assets/theme-park.png"),
		text: "Theme Parks",
	},
	{
		image: require("../assets/cafe.png"),
		text: "Cafe",
	},
	{
		image: require("../assets/bar.png"),
		text: "Bars",
	},
	{
		image: require("../assets/zoo.png"),
		text: "Zoos",
	},
	{
		image: require("../assets/store.png"),
		text: "Stores",
	},
];

const cards = [
	{
		caption: "3 days ago",
		image: require("../assets/background11.jpg"),
		title: "J.Boroski",
		subtitle: "Bars",
		logo: require("../assets/bar.png"),
	},
	{
		caption: "5 days ago",
		image: require("../assets/background12.jpg"),
		title: "Shake Shack",
		subtitle: "Restaurants",
		logo: require("../assets/restaurant.png"),
	},
	{
		caption: "8 days ago",
		image: require("../assets/background13.jpg"),
		title: "Hong Kong Disneyland",
		subtitle: "Theme Parks",
		logo: require("../assets/theme-park.png"),
	},
	{
		caption: "10 days ago",
		image: require("../assets/background14.jpg"),
		title: "K11 Musea",
		subtitle: "Malls",
		logo: require("../assets/mall.png"),
	},
];

const places = [
	{
		title: "Recommended Place 1",
		subtitle: "0.5km",
		image: require("../assets/background6.jpg"),
		logo: require("../assets/cafe.png"),
		author: "Cafe",
		caption: "This is a recommended place",
	},
	{
		title: "Recommended Place 2",
		subtitle: "0.8km",
		image: require("../assets/background13.jpg"),
		logo: require("../assets/zoo.png"),
		author: "Zoos",
		caption: "This is a recommended place",
	},
	{
		title: "Recommended Place 3",
		subtitle: "1.2km",
		image: require("../assets/background11.jpg"),
		logo: require("../assets/mall.png"),
		author: "Malls",
		caption: "Is this a recommended place? This is a recommended place!",
	},
	{
		title: "Recommended Place 4",
		subtitle: "1.5km",
		image: require("../assets/background14.jpg"),
		logo: require("../assets/store.png"),
		author: "Stores",
		caption: "This is a recommended place",
	},
];
