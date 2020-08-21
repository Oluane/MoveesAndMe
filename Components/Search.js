import { Button, FlatList, StyleSheet, Text, TextInput, View } from "react-native";

import MovieItem from "./MovieItem";
import React from "react";
import { movies } from "../Helpers/moviesData";

const Search = () => {
	return (
		<View style={styles.mainContainer}>
			<TextInput placeholder="Titre du film" style={styles.textInput} />
			<Button color={"crimson"} title="Rechercher" onPress={() => {}} />
			<FlatList
				data={movies}
				keyExtractor={(item, idx) => idx.toString()}
				renderItem={({ item }) => <MovieItem movie={item} />}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		marginTop: 20,
	},
	textInput: {
		marginLeft: 5,
		marginRight: 5,
		height: 50,
		borderColor: "#000",
		borderWidth: 1,
		paddingLeft: 5,
	},
});

export default Search;
