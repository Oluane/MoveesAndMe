import { StyleSheet, Text, View } from "react-native";

import React from "react";

const MovieDetails = (props) => {
	console.log(props.navigation);
	return (
		<View style={styles.mainContainer}>
			<Text>Movie details {props.navigation.getParam("movieId")}</Text>
		</View>
	);
};

export default MovieDetails;

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
	},
});
