import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, ImageBackground, TouchableOpacity, ActivityIndicator } from "react-native";


const Hospital = ({ navigation }) => {
    const [data, setData] = useState('')
    const [load, setLoad] = useState(true)

    useEffect(() => {
        getdata();
    }, [])

    const getdata = async () => {
        let data = await fetch(`https://vertual-server.vercel.app/doctor/allhos`);
        data = await data.json()
        if (data) {
            setData(data)
            setLoad(false)
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <Text style={{
                margin: 15,
                fontSize: 20,
                fontWeight: "bold"
            }}>Hospital Near you</Text>
            {
                load ? <ActivityIndicator style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                }} size={44}></ActivityIndicator> : <ScrollView>
                    {
                        data && data.length > 0 ?
                            data.map((item, index) => (
                                <View key={index} style={{
                                    width: "95%",
                                    alignSelf: "center",
                                    marginTop: 10
                                }}>
                                    <View style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        borderRadius: 10,
                                        height: 180,
                                        backgroundColor: "#fff",
                                        elevation: 20,
                                    }}>
                                        <View style={{
                                            width: "30%",
                                            height: "100%"
                                        }}><ImageBackground style={{
                                            height: "100%",
                                            width: "100%",
                                            marginLeft: 10
                                        }} source={require('../Images/do.png')}></ImageBackground>
                                        </View>
                                        <View style={{
                                            width: "70%",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            marginTop: 10
                                        }}>
                                            <Text style={{ fontWeight: '500' }}>{item.hosname}</Text>
                                            <Text>30 min to Reach</Text>
                                            <TouchableOpacity style={{
                                                backgroundColor: "rgb(47,188,245)",
                                                padding: 5,
                                                borderRadius: 5,
                                                width: 150,
                                                marginTop: 10
                                            }} onPress={() => navigation.navigate('singleamb', item._id)}><Text style={{
                                                textAlign: "center",
                                                color: "#fff",

                                            }}>Book</Text></TouchableOpacity>
                                        </View>
                                    </View>
                                    <View style={{
                                        position: "absolute",
                                        right: 15,
                                        top: 8,
                                        backgroundColor: "red",
                                        padding: 4,
                                        borderRadius: 4
                                    }}>
                                        <Text style={{
                                            color: "#fff",
                                            fontWeight: "bold",
                                            fontSize: 8
                                        }}>Available</Text>
                                    </View>

                                </View>


                            )) : <Text>No hospital</Text>
                    }


                </ScrollView>

            }
        </View>
    )
}

export default Hospital;