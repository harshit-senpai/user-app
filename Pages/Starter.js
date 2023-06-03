import React from "react";
import { View, Text, ImageBackground, TouchableOpacity } from "react-native";

const Starter = ({ navigation }) => {
    return (
        <View style={{ flex: 1 }}>
            <ImageBackground style={{ width: "100%", height: "100%" }} source={require('../Images/starter.gif')}>
                <View style={{ flex: 0.5 }}>
                    <Text style={{
                        color: "#fff",
                        fontSize: 25,
                        textAlign: "center",
                        marginTop: 15,
                        fontWeight: "600"
                    }}>OUR APP</Text>
                </View>
                <View style={{ flex: 1.5 }}>
                    <Text style={{ color: "#fff", textAlign: "center", fontSize: 20, fontWeight: "700" }}>WHO ARE YOU?</Text>
                    <Text style={{ color: "#fff", textAlign: "center", marginTop: 15 }}>Select one most accurately represents your identity or situation from a list of available choices.</Text>
                    <TouchableOpacity style={{
                        width: 290,
                        alignSelf: "center",
                        marginTop: 35,
                        padding: 7,
                        borderWidth: 1,
                        backgroundColor: "rgba(217, 217, 217, 0.2)",
                        borderColor: "rgba(136, 136, 136, 1)"
                    }} onPress={() => navigation.navigate('login')}><Text style={{
                        textAlign: "center",
                        fontSize: 19,
                        color: "#fff",
                        fontWeight: "bold",

                    }}>User</Text></TouchableOpacity>
                    <TouchableOpacity style={{
                        width: 290,
                        alignSelf: "center",
                        marginTop: 25,
                        padding: 7,
                        borderWidth: 1,
                        backgroundColor: "rgba(217, 217, 217, 0.2)",
                        borderColor: "rgba(136, 136, 136, 1)"
                    }} onPress={() => navigation.navigate('loginowner')}><Text style={{
                        textAlign: "center",
                        fontSize: 19,
                        color: "#fff",
                        fontWeight: "bold",
                    }}>Organization</Text></TouchableOpacity>
                    <Text style={{
                        color: "#fff",
                        fontSize: 18,
                        position: "relative",
                        left: "76%",
                        top: 10,
                        fontWeight: "500"
                    }}>Why?</Text>

                    <View>
                        <Text></Text>
                    </View>

                </View>

            </ImageBackground>

        </View>
    )
}

export default Starter;