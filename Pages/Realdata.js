import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons'

const RealDate = ({ navigation }) => {
    const [datareal, setDatareal] = useState()
    const [load, setLoad] = useState(true)
    useEffect(() => {
        getdata()
    }, [])

    const getdata = async () => {
        let data = await fetch(`https://api.reliefweb.int/v1/disasters/?appname=apidoc&limit=1000&filter[field]=country&filter[value]=india&preset=latest`)
        data = await data.json()
        if (data) {
            setDatareal(data.data)
            console.log(data.data[0].href)
            setLoad(false)
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{
                width: "100%",
                height: 80,
                backgroundColor: "#fff",
                borderBottomLeftRadius: 30,
                borderBottomRightRadius: 30,
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Text style={{ fontSize: 25, color: "#000" }}>Realtime Alert</Text>
            </View>
            <View style={{
                width: 320,
                backgroundColor: "#fff",
                marginTop: 10,
                alignSelf: "center",
                borderRadius: 50,
                flexDirection: "row",
                justifyContent: "space-around"
            }}>
                <Icon name="search" size={44}></Icon>
                <TextInput placeholder="Search By country"></TextInput>
                <Image source={require('../Images/input.png')}></Image>
            </View>
            {
                load ? <ActivityIndicator style={{ marginTop: 200 }} size={44}></ActivityIndicator> : <View style={{ height: 500, width: "100%", marginTop: 10 }}>
                    <ScrollView>
                        <View style={{ marginBottom: 80 }}>
                            {
                                datareal && datareal.length > 0 ?
                                    datareal.map((item, index) => (
                                        <View key={index} style={{
                                            flexDirection: "row",
                                            width: "95%",
                                            alignSelf: "center",
                                            height: 130,
                                            backgroundColor: "#fff",
                                            elevation: 20,
                                            borderRadius: 10,
                                            marginTop: 10
                                        }}>
                                            <View style={{ height: 120, width: "40%" }}>
                                                <Image style={{ height: 130, width: "100%" }} source={require('../Images/flood.jpeg')}></Image>
                                            </View>
                                            <View style={{ width: "60%", padding: 10 }}>
                                                <Text style={{ fontWeight: "bold" }}>{item.fields.name}</Text>
                                                {/* <Text style={{ fontSize: 12 }}>It is important to note that earthquakes are weird.</Text> */}
                                                <TouchableOpacity style={{
                                                    width: 100,
                                                    backgroundColor: " rgb(211,211,211)",
                                                    marginTop: 10,
                                                    borderRadius: 5
                                                }} onPress={() => navigation.navigate('singlealert',
                                                    item.href)}>
                                                    <Text style={{ color: "rgba(0, 164, 216, 1)", textAlign: "center", fontWeight: "700" }}>Read</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>

                                    )) : null
                            }



                        </View>
                    </ScrollView>
                </View>
            }




        </View>
    )
}

export default RealDate;