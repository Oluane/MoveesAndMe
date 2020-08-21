import { ActivityIndicator, Button, FlatList, StyleSheet, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";

import MovieItem from "./MovieItem";
import { getMoviesFromApiWithSearchedText } from "../api/TMDBApi";

const Search = () => {
	const [movies, setMovies] = useState([]);
	const [searchedText, setSearchedText] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [page, setPage] = useState(0);
	const [totalPages, setTotalPages] = useState(0);

	const searchMovies = () => {};

	useEffect(() => {
		if (page === 0 && movies.length === 0 && totalPages === 0) {
			loadMovies();
		}
	}, [page, movies, totalPages]);

	const loadMovies = () => {
		if (searchedText.length > 0) {
			setIsLoading(true);
			getMoviesFromApiWithSearchedText(searchedText, page + 1).then((data) => {
				console.log(data.total_pages);
				setPage(data.page);
				setTotalPages(data.total_pages);
				setMovies([...movies, ...data.results]);
				setIsLoading(false);
			});
		}
	};

	return (
		<View style={styles.mainContainer}>
			<TextInput
				placeholder="Titre du film"
				value={searchedText}
				style={styles.textInput}
				onChangeText={(e) => setSearchedText(e)}
				onSubmitEditing={() => {
					setPage(0);
					setMovies([]);
					setTotalPages(0);
				}}
			/>
			<Button
				color={"crimson"}
				title="Rechercher"
				onPress={() => {
					setPage(0);
					setMovies([]);
					setTotalPages(0);
				}}
			/>
			<FlatList
				data={movies}
				keyExtractor={(item, idx) => idx.toString()}
				renderItem={({ item }) => <MovieItem movie={item} />}
				onEndReachedThreshold={0.5}
				onEndReached={() => {
					if (page < totalPages) {
						loadMovies();
					}
				}}
			/>
			{isLoading && (
				<View style={styles.loadingContainer}>
					<ActivityIndicator size="large" />
				</View>
			)}
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
	loadingContainer: {
		position: "absolute",
		left: 0,
		right: 0,
		top: 100,
		bottom: 0,
		alignItems: "center",
		justifyContent: "center",
	},
});

export default Search;
