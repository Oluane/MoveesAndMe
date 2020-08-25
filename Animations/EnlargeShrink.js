import { Animated, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";

const EnlargeShrink = (props) => {
	const [viewSize, setViewSize] = useState(new Animated.Value(props.shouldEnlarge ? 60 : 40));
	useEffect(() => {
		Animated.spring(viewSize, {
			toValue: props.shouldEnlarge ? 60 : 40,
			useNativeDriver: false,
		}).start();
	});
	return (
		<Animated.View style={{ width: viewSize, height: viewSize }}>
			{props.children}
		</Animated.View>
	);
};

export default EnlargeShrink;
