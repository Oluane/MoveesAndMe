const initialState = { favoritesMovie: [] };

const toggleFavorite = (state = initialState, action) => {
	switch (action.type) {
		case "TOGGLE_FAVORITE":
			const movieIndex = state.favoritesMovie.findIndex(
				(item) => item.id === action.value.id
			);

			if (movieIndex !== -1) {
				return {
					...state,
					favoritesMovie: state.favoritesMovie.filter((item, idx) => idx !== movieIndex),
				};
			} else {
				return {
					...state,
					favoritesMovie: [...state.favoritesMovie, action.value],
				};
			}

		default:
			return state;
	}
};

export default toggleFavorite;
