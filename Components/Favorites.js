import { StyleSheet, Text, View } from "react-native";

import MoviesList from "./MoviesList";
import React from "react";
import { useSelector } from "react-redux";

const Favorites = (props) => {
	const favMovies = useSelector((state) => state.favoritesMovie);

	return <MoviesList movies={favMovies} navigation={props.navigation} favoriteList={true} />;
};

export default Favorites;

const styles = StyleSheet.create({});
