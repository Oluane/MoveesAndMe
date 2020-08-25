import { FlatList, StyleSheet } from "react-native";
import React, { useEffect } from "react";

import MovieItem from "./MovieItem";
import { useSelector } from "react-redux";

const MoviesList = React.memo(
	({ movies, navigation, page, totalPages, loadMovies, favoriteList }) => {
		const displayMovieDetails = (movieId) => {
			navigation.navigate("MovieDetails", { movieId: movieId });
		};

		const favMovies = useSelector((state) => state.favoritesMovie);

		return (
			<FlatList
				keyExtractor={(item, index) => index.toString()}
				data={movies}
				extraData={favMovies}
				renderItem={({ item }) => {
					return (
						<MovieItem
							key={item.key}
							movie={item}
							displayMovieDetails={displayMovieDetails}
							isFavorite={
								favMovies.findIndex((movie) => movie.id === item.id) !== -1
									? true
									: false
							}
						/>
					);
				}}
				onEndReachedThreshold={0.5}
				onEndReached={() => {
					if (!favoriteList && page < totalPages) {
						loadMovies();
					}
				}}
			/>
		);
	}
);
const styles = StyleSheet.create({});

export default MoviesList;
