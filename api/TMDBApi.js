const API_TOKEN = "";

export const getMoviesFromApiWithSearchedText = (text, page) => {
	const url =
		"https://api.themoviedb.org/3/search/movie?api_key=" +
		API_TOKEN +
		"&language=fr&query=" +
		text +
		"&page=" +
		page;

	return fetch(url)
		.then((res) => res.json())
		.catch((err) => console.error(err));
};

export const getImgFromApi = (path) => {
	return "https://image.tmdb.org/t/p/w300" + path;
};

export const getMovieDetailsFromApi = (id) => {
	return fetch(
		"https://api.themoviedb.org/3/movie/" + id + "?api_key=" + API_TOKEN + "&language=fr"
	)
		.then((response) => response.json())
		.catch((error) => console.error(error));
};
