import { ActivityIndicator, Button, FlatList, StyleSheet, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";

import MovieItem from "./MovieItem";
import MoviesList from "./MoviesList";
import { getMoviesFromApiWithSearchedText } from "../api/TMDBApi";
import { useSelector } from "react-redux";

const Search = (props) => {
	const [movies, setMovies] = useState([]);
	const [searchedText, setSearchedText] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [page, setPage] = useState(0);
	const [totalPages, setTotalPages] = useState(0);

	useEffect(() => {
		if (page === 0 && movies.length === 0 && totalPages === 0) {
			loadMovies();
		}
	}, [page, movies, totalPages]);

	const loadMovies = () => {
		console.log("toto");
		if (searchedText.length > 0) {
			setIsLoading(true);
			console.log("tata");
			getMoviesFromApiWithSearchedText(searchedText, page + 1).then((data) => {
				setPage(data.page);
				setTotalPages(data.total_pages);
				setMovies([...movies, ...data.results]);
				setIsLoading(false);
			});
		}
	};

	const displayMovieDetails = (movieId) => {
		navigation.navigate("MovieDetails", { movieId: movieId });
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
				title="Search"
				onPress={() => {
					setPage(0);
					setMovies([]);
					setTotalPages(0);
				}}
			/>
			<MoviesList
				movies={movies}
				navigation={props.navigation}
				page={page}
				totalPages={totalPages}
				loadMovies={loadMovies}
				favoriteList={false}
			/>
			{/* <FlatList
				data={movies}
				keyExtractor={(item, idx) => idx.toString()}
				renderItem={({ item }) => {
					let isFavorite = false;
					if (favMovies.findIndex((movie) => movie.id === item.id) !== -1) {
						isFavorite = true;
					}
					return (
						<MovieItem
							movie={item}
							displayMovieDetails={displayMovieDetails}
							isFavorite={isFavorite}
						/>
					);
				}}
				onEndReachedThreshold={0.5}
				onEndReached={() => {
					if (page < totalPages) {
						loadMovies();
					}
				}}
			/> */}
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
