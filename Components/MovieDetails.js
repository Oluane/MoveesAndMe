import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { getImgFromApi, getMovieDetailsFromApi } from "../api/TMDBApi";
import { useDispatch, useSelector } from "react-redux";

import { TouchableOpacity } from "react-native-gesture-handler";

const MovieDetails = (props) => {
	const [movie, setMovie] = useState(undefined);
	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useDispatch();

	const favMovies = useSelector((state) => state.favoritesMovie);

	const toggleFavorite = () => {
		dispatch({ type: "TOGGLE_FAVORITE", value: movie });
	};

	const displayFavImage = () => {
		let source = require("../Images/ic_favorite_border.png");
		if (favMovies.findIndex((item) => item.id === movie.id) !== -1) {
			source = require("../Images/ic_favorite.png");
		}
		return source;
	};

	// useEffect(() => {
	// 	console.log(favMovies);
	// }, [favMovies]);

	useEffect(() => {
		const favMovieIdx = favMovies.findIndex(
			(item) => item.id === props.navigation.state.params.movieId
		);

		if (favMovieIdx !== -1) {
			setMovie(favMovies[favMovieIdx]);
		} else {
			setIsLoading(true);
			getMovieDetailsFromApi(props.navigation.state.params.movieId).then((data) => {
				setMovie(data);
				setIsLoading(false);
			});
		}
	}, [props.navigation.state.params.movieId]);

	return (
		<View style={styles.mainContainer}>
			{isLoading ? (
				<View style={styles.loadingContainer}>
					<ActivityIndicator size="large" />
				</View>
			) : (
				movie !== undefined && (
					<ScrollView style={styles.scrollContainer}>
						<Image
							style={styles.image}
							source={{ uri: getImgFromApi(movie.backdrop_path) }}
						/>
						<Text style={styles.title}>{movie.title}</Text>
						<TouchableOpacity
							style={styles.favContainer}
							onPress={() => toggleFavorite()}
						>
							<Image style={styles.favImage} source={displayFavImage()} />
						</TouchableOpacity>
						<Text style={styles.description}>{movie.overview}</Text>
						<Text style={styles.otherTexts}>Released on {movie.release_date}</Text>
						<Text style={styles.otherTexts}>Note: {movie.vote_average}/10</Text>
						<Text style={styles.otherTexts}>Votes count : {movie.vote_count}</Text>
						<Text style={styles.otherTexts}>Budget: {movie.budget}$</Text>
						<Text style={styles.otherTexts}>
							Genres:{" "}
							{movie.genres
								.map((genre) => {
									return genre.name;
								})
								.join("/")}
						</Text>
						<Text style={styles.otherTexts}>
							Companies:{" "}
							{movie.production_companies
								.map((company) => {
									return company.name;
								})
								.join("/")}
						</Text>
					</ScrollView>
				)
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
	},
	loadingContainer: {
		position: "absolute",
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		alignItems: "center",
		justifyContent: "center",
	},
	image: {
		height: 160,
	},
	scrollContainer: {
		flex: 1,
	},
	title: {
		fontWeight: "bold",
		fontSize: 28,
		textAlign: "center",
		flex: 1,
		flexWrap: "wrap",
		marginLeft: 5,
		marginRight: 5,
		marginTop: 10,
		marginBottom: 10,
		color: "crimson",
	},
	description: {
		color: "#666",
		margin: 8,
		marginBottom: 15,
		fontStyle: "italic",
	},
	otherTexts: {
		marginLeft: 8,
		marginRight: 8,
		marginTop: 5,
		fontWeight: "700",
	},
	favContainer: {
		alignItems: "center",
	},
	favImage: {
		width: 40,
		height: 40,
	},
});

export default MovieDetails;
