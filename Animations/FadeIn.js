import { Animated, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";

const FadeIn = (props) => {
	const [positionLeft, setPositionLeft] = useState(
		new Animated.Value(Dimensions.get("window").width)
	);

	useEffect(() => {
		Animated.spring(positionLeft, {
			toValue: 0,
			useNativeDriver: false,
		}).start();
	});
	return <Animated.View style={{ left: positionLeft }}>{props.children}</Animated.View>;
};

export default FadeIn;
