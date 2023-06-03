import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, ImageBackground, TouchableOpacity } from 'react-native'
const SingleAlert = ({ navigation, route }) => {
    const id = route.params;

    const [overview, setOverview] = useState('')
    const [desc, setDesc] = useState('')
    const [lat, setLat] = useState('')
    const [lon, setLon] = useState('')
    const [name, setName] = useState('')
    const [longname, setLongname] = useState('')
    useEffect(() => {
        getreal()
    }, [])

    const getreal = async () => {
        let data = await fetch(`${id}`)
        data = await data.json()
        if (data) {
            console.log(data)
            setOverview(data.data[0].fields.profile.overview)
            setDesc(data.data[0].fields.description)
            setLat(data.data[0].fields.country[0].location.lat)
            setLon(data.data[0].fields.country[0].location.lon)
            setName(data.data[0].fields.type[0].name)
            setLongname(data.data[0].fields.name)
        }
    }
    return (

        <View style={{ flex: 1 }}>
            <ScrollView>

                <View style={{ marginBottom: 100 }}>
                    <View>
                        <ImageBackground style={{ height: 200, width: "100%" }} source={require('../Images/flood.jpeg')}></ImageBackground>
                    </View>
                    <View style={{
                        backgroundColor: "#fff",
                        height: "100%",
                        width: "100%",
                        borderTopRightRadius: 20,
                        borderTopLeftRadius: 20,
                        position: "relative",
                        bottom: 7
                    }}>
                        <View style={{ width: 200, height: 3, backgroundColor: "#000", marginTop: 10, alignSelf: "center" }}></View>
                        <Text style={{
                            padding: 10,
                            fontSize: 15,
                            color: "#000",
                            fontWeight: "bold"
                        }}>{name}</Text>
                        <Text style={{ marginLeft: 10 }}>{longname}</Text>

                        <View style={{ width: 340, height: 2, backgroundColor: "#000", marginTop: 10, alignSelf: "center" }}></View>
                        <Text style={{ marginLeft: 10, fontSize: 20, color: "#000", fontWeight: "600" }}>Overview</Text>
                        <Text style={{ marginLeft: 10, marginTop: 5, color: "#000", fontSize: 12 }}>
                            {overview}
                        </Text>

                        <Text style={{ marginLeft: 10, fontSize: 20, color: "#000", fontWeight: "600", marginTop: 5 }}>Description</Text>
                        <Text style={{ marginLeft: 10, marginTop: 5, color: "#000", fontSize: 12 }}>
                            {desc}
                        </Text>

                        <TouchableOpacity style={
                            {
                                width: 270,
                                padding: 5,
                                borderWidth: 0.5,
                                alignSelf: "center",
                                borderRadius: 5,
                                backgroundColor: "#000",
                                marginTop: 10
                            }
                        } onPress={() => navigation.navigate('realmap', {
                            lat, lon
                        })}><Text style={{
                            textAlign: "center",
                            fontSize: 20,
                            color: "#fff"
                        }}>View in map</Text></TouchableOpacity>
                    </View>
                </View>


            </ScrollView>

        </View>


    )
}

export default SingleAlert;