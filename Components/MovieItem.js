import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import FadeIn from "../Animations/FadeIn";
import React from "react";
import { getImgFromApi } from "../api/TMDBApi";

const MovieItem = React.memo(({ movie, displayMovieDetails, isFavorite }) => {
	return (
		<FadeIn>
			<TouchableOpacity
				style={styles.mainContainer}
				onPress={() => displayMovieDetails(movie.id)}
			>
				<Image style={styles.image} source={{ uri: getImgFromApi(movie.poster_path) }} />
				<View style={styles.subContainer}>
					<View style={styles.header}>
						{isFavorite && (
							<Image
								style={styles.imgFav}
								source={require("../Images/ic_favorite.png")}
							/>
						)}
						<Text style={styles.titleText} numberOfLines={2}>
							{movie.title}
						</Text>
						<Text style={styles.voteText}>{movie.vote_average}</Text>
					</View>
					<View style={styles.descriptionContainer}>
						<Text style={styles.description} numberOfLines={6}>
							{movie.overview}
						</Text>
					</View>
					<View style={styles.dateContainer}>
						<Text style={styles.date}>Sorti le {movie.release_date}</Text>
					</View>
				</View>
			</TouchableOpacity>
		</FadeIn>
	);
});

const styles = StyleSheet.create({
	mainContainer: {
		height: 190,
		flexDirection: "row",
	},
	subContainer: {
		flex: 1,
		margin: 5,
	},
	header: {
		flex: 3,
		flexDirection: "row",
		alignItems: "center",
	},
	image: {
		width: 120,
		height: 180,
		margin: 5,
	},
	titleText: {
		color: "crimson",
		fontWeight: "bold",
		fontSize: 20,
		flex: 1,
		flexWrap: "wrap",
		paddingRight: 5,
	},
	voteText: {
		fontWeight: "bold",
		fontSize: 26,
		color: "#666",
	},
	descriptionContainer: {
		flex: 7,
	},
	description: {
		fontStyle: "italic",
		color: "#666",
	},
	dateContainer: {
		flex: 1,
	},
	date: {
		textAlign: "right",
		fontSize: 14,
	},
	imgFav: {
		width: 20,
		height: 20,
		marginRight: 5,
	},
});

export default MovieItem;
