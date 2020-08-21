import { Image, StyleSheet, Text, View } from "react-native";

import React from "react";
import { getImgFromApi } from "../api/TMDBApi";

const MovieItem = ({ movie }) => {
	return (
		<View style={styles.mainContainer}>
			<Image style={styles.image} source={{ uri: getImgFromApi(movie.poster_path) }} />
			<View style={styles.subContainer}>
				<View style={styles.header}>
					<Text style={styles.titleText}>{movie.title}</Text>
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
		</View>
	);
};

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
});

export default MovieItem;
