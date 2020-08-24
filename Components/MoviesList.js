import { FlatList, StyleSheet } from "react-native";

import MovieItem from "./MovieItem";
import React from "react";
import { useSelector } from "react-redux";

const MoviesList = ({ movies, navigation, page, totalPages, loadMovies, favoriteList }) => {
	const displayMovieDetails = (movieId) => {
		navigation.navigate("MovieDetails", { movieId: movieId });
	};

	const favMovies = useSelector((state) => state.favoritesMovie);

	return (
		<FlatList
			keyExtractor={(item, idx) => idx.toString()}
			data={movies}
			extraData={favMovies}
			renderItem={({ item }) => (
				<MovieItem
					movie={item}
					displayMovieDetails={displayMovieDetails}
					isFavorite={
						favMovies.findIndex((movie) => movie.id === item.id) !== -1 ? true : false
					}
				/>
			)}
			onEndReachedThreshold={0.5}
			onEndReached={() => {
				if (!favoriteList && page < totalPages) {
					loadMovies();
				}
			}}
		/>
	);
};
const styles = StyleSheet.create({});

export default MoviesList;
