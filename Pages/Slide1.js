import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons'
const Slide1 = ({ navigation }) => {
    return (
        <View style={{
            flex: 1
        }}>
            <View style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Image style={{ width: "100%", height: "100%" }} source={require('../Images/slide1.gif')}></Image>
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
                marginTop: 20
            }}>
                <Text style={{
                    textAlign: "center",
                    fontSize: 30,
                    color: "#000"
                }}>Ask for help!</Text>
                <Text style={{
                    textAlign: "center",
                    marginTop: 20,
                    fontSize: 15
                }}>This app offer help for people in danger.
                    Users can request assistance, connecting them to
                    relevant organizations or trained professionals.</Text>
                <View style={{
                    position: "absolute",
                    bottom: 30, right: 20
                }}>
                    <TouchableOpacity onPress={() => navigation.navigate('slide2')}>
                        <View style={{
                            flexDirection: "row"
                        }} >
                            <Text style={{
                                fontSize: 20,
                                color: "#000",
                                fontWeight: "bold"
                            }}> Next</Text>
                            <Icon name="arrow-right" size={34} color="black" >
                            </Icon>

                        </View>

                    </TouchableOpacity>


                </View>
            </View>

        </View>
    )
}

export default Slide1