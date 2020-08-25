import { ActivityIndicator, Button, StyleSheet, TextInput, View } from "react-native";
import React, { useCallback, useState } from "react";

import MovieItem from "./MovieItem";
import MoviesList from "./MoviesList";
import { getMoviesFromApiWithSearchedText } from "../api/TMDBApi";
import { useSelector } from "react-redux";

const Search = (props) => {
	const [movies, setMovies] = useState([]);
	const [searchedText, setSearchedText] = useState("");
	const [inputText, setInputText] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [page, setPage] = useState(0);
	const [totalPages, setTotalPages] = useState(0);

	const loadMovies = useCallback((query, movies, page) => {
		if (query.length > 0) {
			setIsLoading(true);
			getMoviesFromApiWithSearchedText(query, page + 1).then((data) => {
				setPage(data.page);
				setTotalPages(data.total_pages);
				setMovies([...movies, ...data.results]);
				setIsLoading(false);
			});
		}
	}, []);

	const searchMovies = (query) => {
		setSearchedText(query);
		setPage(0);
		setMovies([]);
		setTotalPages(0);
		loadMovies(query, [], 0);
	};

	return (
		<View style={styles.mainContainer}>
			<TextInput
				placeholder="Titre du film"
				value={inputText}
				style={styles.textInput}
				onChangeText={(e) => setInputText(e)}
				onSubmitEditing={(e) => {
					searchMovies(inputText);
				}}
			/>
			<Button
				color={"crimson"}
				title="Search"
				onPress={() => {
					searchMovies(inputText);
				}}
			/>
			<MoviesList
				movies={movies}
				navigation={props.navigation}
				page={page}
				totalPages={totalPages}
				loadMovies={() => loadMovies(searchedText, movies, page)}
				favoriteList={false}
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
	textInput: {
		marginLeft: 5,
		marginRight: 5,
		height: 50,
		borderColor: "#777",
		borderWidth: 1,
		paddingLeft: 5,
	},
	loadingContainer: {
		position: "absolute",
		left: 0,
		right: 0,
		top: 150,
		bottom: 0,
		alignItems: "center",
		justifyContent: "center",
	},
});

export default Search;
