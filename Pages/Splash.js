import React from "react";
import { View, Text, Image, ImageBackground } from "react-native";

const Splah = () => {
    return (
        <View style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
        }}>
            <ImageBackground style={{ width: "100%", height: "100%" }} source={require('../Images/splash.gif')}></ImageBackground>

        </View>
    )
}

export default Splah;