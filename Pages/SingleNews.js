import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, ImageBackground, TouchableOpacity, ActivityIndicator } from "react-native";


const SingleNews = ({ navigation, route }) => {
    const id = route.params;
    const [heading, setHeading] = useState('')
    const [subheading, setSubheading] = useState('')
    const [desc, setDesc] = useState('')
    const [images, setImages] = useState('')
    const [load, setLoad] = useState(true)
    const [lat, setLat] = useState('')
    const [lon, setLon] = useState('')
    useEffect(() => {
        singlepost()
    }, [])

    const singlepost = async () => {
        let data = await fetch(`https://noida-server.vercel.app/post/post/single/${id}`)
        data = await data.json()
        if (data) {
            setHeading(data.heading)
            setSubheading(data.subheading)
            setDesc(data.desc)
            setImages(data.images)
            setLat(data.lat)
            setLon(data.lon)
            setLoad(false)
        }
    }
    return (
        <View style={{ flex: 1 }}>
            {
                load ? <ActivityIndicator style={{ marginTop: 250 }} size={44}></ActivityIndicator> : <ScrollView>
                    <View style={{ marginBottom: 100 }}>
                        <View>
                            <ImageBackground style={{ height: 200, width: "100%" }} source={{ uri: `${images}` }}></ImageBackground>
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
                            }}>{heading}</Text>
                            <Text style={{ marginLeft: 10 }}>{subheading}</Text>

                            <View style={{ width: 340, height: 2, backgroundColor: "#000", marginTop: 10, alignSelf: "center" }}></View>
                            <Text style={{ marginLeft: 10, marginTop: 5, color: "#000", fontSize: 12 }}>
                                {/* The last significant earthquake to affect Mumbai occurred on January 26,
                            2001, when a magnitude 7.6 earthquake struck the neighboring state of Gujarat.
                            The earthquake caused significant damage and loss of life in Gujarat and was
                            felt in Mumbai and other parts of western India. In Mumbai, there were reports
                            of buildings shaking and people rushing out onto the streets.
                            The last significant earthquake to affect Mumbai occurred on January 26,
                            2001, when a magnitude 7.6 earthquake struck the neighboring state of Gujarat.
                            The earthquake caused significant damage and loss of life in Gujarat and was
                            felt in Mumbai and other parts of western India. In Mumbai, there were reports
                            of buildings shaking and people rushing out onto the streets. */}
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
                            } onPress={() => navigation.navigate('newsmap', {
                                lat, lon
                            })}><Text style={{
                                textAlign: "center",
                                fontSize: 20,
                                color: "#fff"
                            }}>View in map</Text></TouchableOpacity>
                        </View>
                    </View>


                </ScrollView>
            }




        </View>

    )
}

export default SingleNews;