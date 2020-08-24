import { Image, StyleSheet } from "react-native";

import Favorites from "../Components/Favorites";
import MovieDetails from "../Components/MovieDetails";
import React from "react";
import Search from "../Components/Search";
import Test from "../Components/Test";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";

const SearchStackNavigator = createStackNavigator({
	Search: {
		screen: Search,
		navigationOptions: {
			title: "Search",
		},
	},
	MovieDetails: {
		screen: MovieDetails,
	},
});

const FavoritesStackNavigator = createStackNavigator({
	Favorites: {
		screen: Favorites,
		navigationOptions: {
			title: "Favorites",
		},
	},
	FilmDetail: {
		screen: MovieDetails,
	},
});

const MoviesTabNavigator = createBottomTabNavigator(
	{
		// Test: {
		// 	screen: Test,
		// },
		Search: {
			screen: SearchStackNavigator,
			navigationOptions: {
				tabBarIcon: () => {
					return (
						<Image source={require("../Images/ic_search.png")} style={styles.icon} />
					);
				},
			},
		},
		Favorites: {
			screen: FavoritesStackNavigator,
			navigationOptions: {
				tabBarIcon: () => {
					return (
						<Image source={require("../Images/ic_favorite.png")} style={styles.icon} />
					);
				},
			},
		},
	},
	{
		tabBarOptions: {
			activeBackgroundColor: "#DDD",
			inactiveBackgroundColor: "#FFF",
			showLabel: false,
			showIcon: true,
		},
	}
);

const styles = StyleSheet.create({
	icon: {
		width: 30,
		height: 30,
	},
});

export default createAppContainer(MoviesTabNavigator);
