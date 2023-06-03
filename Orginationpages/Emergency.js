import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView, ImageBackground, ActivityIndicator } from 'react-native'

const Emergency = ({ navigation }) => {
    const [data, setData] = useState('')
    const [load, setLoad] = useState(true)
    const [lat, setLat] = useState('')
    const [lon, setLon] = useState('')


    useEffect(() => {
        getdata()
    }, [])

    const getdata = async () => {
        let data = await fetch(`https://noida-server.vercel.app/post/post/emergengy/true`);
        data = await data.json()
        if (data) {
            setData(data)
            setLoad(false)
        }
    }
    const loc = (lat, lon) => {
        navigation.navigate('map', { lat, lon })
    }
    return (
        <View style={{ flex: 1 }}>
            <TouchableOpacity style={{ padding: 20 }} onPress={() => navigation.goBack()}>
                <Image source={require('../Images/cancel.png')}></Image>
            </TouchableOpacity>
            <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "500" }}>Emergency Alert</Text>
            <View style={{
                alignSelf: "center",
                width: "65%",
                height: 2,
                backgroundColor: "rgba(154, 154, 154, 1)",
                marginTop: 7
            }}>
            </View>
            {
                load ? <ActivityIndicator style={{ marginTop: 200 }} size={44}></ActivityIndicator> : <View style={{ height: 500, width: "100%", marginTop: 10 }}>
                    <ScrollView>
                        <View style={{ marginBottom: 80 }}>

                            {
                                data && data.length > 0 ?
                                    data.map((item, index) => (
                                        <View style={{
                                            flexDirection: "row",
                                            width: "95%",
                                            alignSelf: "center",
                                            height: 130,
                                            backgroundColor: "#fff",
                                            elevation: 20,
                                            borderRadius: 10,
                                            marginTop: 10
                                        }} key={index}>
                                            <View style={{ height: 120, width: "40%" }}>
                                                <Image style={{ height: 130, width: "100%" }} source={{ uri: `${item.images}` }}></Image>
                                            </View>
                                            <View style={{ width: "60%", padding: 10 }}>
                                                <Text style={{ fontWeight: "bold" }}>{item.heading}</Text>
                                                <Text style={{ fontSize: 12 }}>{item.subheading}</Text>
                                                <TouchableOpacity style={{
                                                    width: 100,
                                                    backgroundColor: " rgb(211,211,211)",
                                                    marginTop: 10,
                                                    borderRadius: 5
                                                }} onPress={() => loc(item.lat, item.lon)}>
                                                    <Text style={{ color: "rgba(0, 164, 216, 1)", textAlign: "center", fontWeight: "700" }}>Location</Text>
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

export default Emergency;