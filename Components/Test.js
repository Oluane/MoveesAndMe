import {
	Animated,
	Dimensions,
	Easing,
	PanResponder,
	Platform,
	StyleSheet,
	View,
} from "react-native";
import React, { useEffect, useState } from "react";

const Test = () => {
	const [topPosition, setTopPosition] = useState(0);
	const [leftPosition, setLeftPosition] = useState(0);

	const { width, height } = Dimensions.get("window");
	let panResponder = PanResponder.create({
		onStartShouldSetPanResponder: (evt, gestureState) => true,
		onPanResponderMove: (evt, gestureState) => {
			let touches = evt.nativeEvent.touches;
			if (touches.length == 1) {
				setTopPosition(touches[0].pageY - height / 2);
				setLeftPosition(touches[0].pageX - width / 2);
			}
		},
	});

	useEffect(() => {
		// Animated.timing(topPosition, {
		// 	toValue: 100,
		// 	duration: 3000,
		// 	easing: Easing.linear,
		// }).start();
		// Animated.spring(topPosition, {
		// 	toValue: 100,
		// 	speed: 3,
		// 	bounciness: 30,
		// }).start();
		// Animated.decay(topPosition, {
		// 	velocity: 0.6,
		// 	deceleration: 0.997,
		// }).start();
		// Animated.sequence([
		// 	Animated.spring(topPosition, {
		// 		toValue: 100,
		// 		tension: 8,
		// 		friction: 3,
		// 		useNativeDriver: false,
		// 	}),
		// 	Animated.timing(topPosition, {
		// 		toValue: 0,
		// 		duration: 1000,
		// 		easing: Easing.elastic(2),
		// 		useNativeDriver: false,
		// 	}),
		// ]).start();
		// Animated.parallel([
		// 	Animated.spring(topPosition, {
		// 		toValue: 100,
		// 		tension: 8,
		// 		friction: 3,
		// 		useNativeDriver: false,
		// 	}),
		// 	Animated.timing(leftPosition, {
		// 		toValue: 100,
		// 		duration: 1000,
		// 		easing: Easing.elastic(2),
		// 		useNativeDriver: false,
		// 	}),
		// ]).start();
	}, []);

	return (
		<View style={styles.mainContainer}>
			<Animated.View
				{...panResponder.panHandlers}
				style={[styles.subviewContainer, { top: topPosition, left: leftPosition }]}
			></Animated.View>
		</View>
	);
};

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	subviewContainer: {
		// backgroundColor: Platform.OS === "ios" ? "red" : "blue",
		// height: Platform.OS === "ios" ? 100 : 50,
		// width: Platform.Os === "ios" ? 50 : 100,
		backgroundColor: "crimson",
		width: 100,
		height: 100,
	},
});

export default Test;
