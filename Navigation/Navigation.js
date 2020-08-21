import MovieDetails from "../Components/MovieDetails";
import Search from "../Components/Search";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

const SearchStackNavigator = createStackNavigator({
	Search: {
		screen: Search,
		navigatorOptions: {
			title: "Rechercher",
		},
	},
	MovieDetails: {
		screen: MovieDetails,
	},
});

export default createAppContainer(SearchStackNavigator);
