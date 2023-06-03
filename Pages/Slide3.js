import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons'

const Slide3 = ({ navigation }) => {
    return (
        <View style={{
            flex: 1
        }}>
            <View style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Image style={{ width: "100%", height: "100%" }} source={require('../Images/slide3.gif')}></Image>
            </View>
            <View style={{
                alignSelf: "center",
                width: "90%",
                height: 4,
                backgroundColor: "rgba(154, 154, 154, 1)",
                marginTop: 20
            }}>
            </View>

            <View style={{
                flex: 1,
                padding: 10,
                marginTop: 10
            }}>
                <Text style={{
                    textAlign: "center",
                    fontSize: 30,
                    color: "#000"
                }}>Get the Track support</Text>
                <Text style={{
                    textAlign: "center",
                    marginTop: 10,
                    fontSize: 15
                }}>Users of the app have access to customer support,
                    which is available to provide assistance in various
                    forms to ensure a positive experience</Text>
                <TouchableOpacity style={{
                    width: 200,
                    backgroundColor: "#000",
                    padding: 8,
                    alignSelf: "center",
                    marginTop: 15,
                    borderRadius: 5
                }} onPress={() => navigation.navigate('starter')}>
                    <Text style={{ color: "#fff", textAlign: "center", fontSize: 15, fontWeight: "600" }}>Login</Text>
                </TouchableOpacity>
                <View style={{
                    position: "absolute",
                    bottom: 30, left: 20
                }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <View style={{
                            flexDirection: "row"
                        }}>
                            <Icon name="arrow-left" size={34} color="black" >
                            </Icon><Text style={{
                                fontSize: 20,
                                color: "#000",
                                fontWeight: "bold"
                            }}>Back</Text>

                        </View>

                    </TouchableOpacity>
                </View>
            </View>

        </View>
    )
}

export default Slide3;