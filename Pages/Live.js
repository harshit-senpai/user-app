import React from "react";
import { View, Text, Image, TouchableOpacity, ImageBackground } from "react-native";

const Live = ({ navigation }) => {
    return (
        <View style={{ flex: 1 }}>
            <TouchableOpacity style={{ padding: 20 }} onPress={() => navigation.goBack()}>
                <Image source={require('../Images/cancel.png')}></Image>
            </TouchableOpacity>
            <View>
                <Text style={{ textAlign: "center", fontSize: 24, fontWeight: "bold" }}>Go Live</Text>
            </View>
            <View style={{ width: "90%", height: 130, alignSelf: "center", marginTop: 10 }}>
                <ImageBackground style={{ width: "100%", height: "100%", borderRadius: 10 }} source={require('../Images/livebac.png')}>
                    <Text style={{ padding: 10, fontSize: 22, color: "#000" }}>Connect with users near you!</Text>
                    <Text style={{ marginLeft: 10 }}>Now, world can watch your situation. This will help to aware people near you...</Text>
                </ImageBackground>
            </View>
            <View style={{ padding: 20, marginTop: 10 }}>
                <Text style={{ fontSize: 20, color: "#000" }}>Why this is benefit?</Text>
                <View style={{ marginTop: 10 }}>
                    <Text style={{ fontSize: 15, color: "#000" }}>1. Experiencing the world: <Text style={{ fontSize: 12 }}>
                        Life provides us with the opportunity to
                        experience the beauty, wonder, and
                        diversity of the world around us.
                    </Text>
                    </Text>
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text style={{ fontSize: 15, color: "#000" }}>1. Experiencing the world: <Text style={{ fontSize: 12 }}>
                        Life provides us with the opportunity to
                        experience the beauty, wonder, and
                        diversity of the world around us.
                    </Text>
                    </Text>
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text style={{ fontSize: 15, color: "#000" }}>1. Experiencing the world: <Text style={{ fontSize: 12 }}>
                        Life provides us with the opportunity to
                        experience the beauty, wonder, and
                        diversity of the world around us.
                    </Text>
                    </Text>
                </View>
                <TouchableOpacity style={{
                    width: 200,
                    padding: 7,
                    backgroundColor: "#000",
                    marginTop: 10,
                    alignSelf: "center",
                    borderRadius: 7
                }} onPress={() => navigation.navigate('stream')}>
                    <Text style={{ textAlign: "center", color: "#fff", fontSize: 20 }}>Go Live</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Live;